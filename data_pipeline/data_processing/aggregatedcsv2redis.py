"""
This allows us to upload CSV data onto redis.
"""
import logging
import mimetypes
import os
import sys
from datetime import datetime
import json

import pandas as pd
from rejson import Client, Path

logger = logging.getLogger(__name__)
loggingLevel = eval("logging." + os.environ.get("LOGGING_LEVEL", "WARNING"))
logging.basicConfig(level=loggingLevel, format="%(message)s")


class Csv2Redis:
    def __init__(self, filename: str):
        self.filename = filename
        # Hardcoded data we need for 2020 election candidates
        self.candidate_ids = {
            "Andres Quintero": "1",
            "Bien Doan": "2",
            "Cindy Chavez": "3",
            "Dev Davis": "4",
            "Elizabeth Chien-Hale": "5",
            "HG Nguyen": "6",
            "Irene Smith": "7",
            "James Spence": "8",
            "Joanna Rauh": "9",
            "Justin Lardinois": "10",
            "Matt Mahan": "11",
            "Maya Esparza": "12",
            "Nora Campos": "13",
            "Omar Torres": "14",
            "Pam Foley": "15",
            "Peter Ortiz": "16",
            "Ramona Snyder": "17",
            "Raul Peralez": "18",
            "Rolando Bonilla": "19",
            "Rosemary Kamei": "20",
            "Van Le": "21"
        }
        self.referendums = {}
    def read_data_sheet(self):
        # Read the clean csv file from Google sheet. This file won't work on just aggregated csv from scrapper.
        # Skip every other line. If the clean csv changes to every line, we need to update this as well.
        if not os.path.exists(self.filename):
            logger.warning(
                "{} does not exist. Please double check the file path.".format(
                    self.filename
                )
            )
        if not os.path.isfile(self.filename):
            logger.warning(
                "Only process csv file. Please double check {} is a file.".format(
                    self.filename
                )
            )
        filetype, _ = mimetypes.guess_type(self.filename)
        if "csv" in filetype:
            self.data = pd.read_csv(
                self.filename,
                sep=",",
                quotechar='"',
                encoding="iso-8859-1",
            )
        elif "spreadsheet" in filetype:
            logger.info("Reading plain text csv is faster and is encouraged.")
            self.data = pd.read_excel(self.filename, skiprows=lambda x: x % 2 == 1,)
        else:
            logger.warning("Only read csv and spreadsheet file for now.")
            return
        if self.data.shape[0] < 100:
            logger.info(
                "{} only have {} row.".format(self.filename, self.data.shape[0])
            )
        # Add candidate ID column. candidate ID is <Ballot Item>;<CandidateControlledName>;<Election Date>
        self.data["Ballot Item"] = self.data["Ballot Item"].str.replace("-", " ")
        self.data["ID"] = (
            self.data["Ballot Item"].str.replace(" ", "_")
            + ";"
            + self.data["CandidateControlledName"].str.replace(" ", "_")
            + ";"
            + self.data["Election Date"].map(str)
        )
        # Round Amount to decimal 2
        self.data["Amount"] = (
            self.data["Amount"]
            .map(str)
            .str.replace(",", "")
            .replace("$", "")
            .replace("'", "")
            .astype(float)
            .round(decimals=2)
        )
        self.metadata = str(datetime.fromtimestamp(os.path.getmtime(self.filename)))

    def get_ids(self, ids) -> str:
        """
        :param ids: list of strings in format <Ballot Item>;<CandidateControlledName>;<Election Date>
        :return: unique candidate id from candidate_ids dict
        """
        ret = []
        for id in ids:
            cand_name = id.split(";")[1].replace("_", " ")
            # If there are independent contributions, they won't be associated with a candidate.
            if cand_name in self.candidate_ids:
                ret.append(self.candidate_ids[cand_name])
        return ret

    def set_path_in_redis(self, path_name, data_shape):
        """
        :param path_name: str representing the name of our new path
        :param data_shape: dict/json of data we're inserting
        """
        print(path_name)
        print(json.dumps(data_shape))

    def set_referendums_shape_in_redis(self) -> None:
        """
        Set the referendums key in redis with the appropriate data (currently hardcoded)
        """
        try:
            self.set_path_in_redis(
                "referendums", {"Referendums": list(self.referendums.values())}
            )
        except Exception as e:
            logger.debug(e)

    def set_metadata_shape_in_redis(self) -> None:
        """
        Set metadata key in redis with date last processed
        """
        try:
            self.set_path_in_redis("metadata", {"DateProcessed": self.metadata})
        except Exception as e:
            logger.debug(e)

    def setElectionShapeInRedis(self) -> bool:
        """
        Populate election shape into redis
        """
        data = self.data
        electionShape = {"Elections": {}}
        dataAmount = data[
            [
                "Ballot Item",
                "CandidateControlledName",
                "Election Date",
                "Entity_City",
                "Entity_ST",
                "Amount",
                "Rec_Type",
                "ID",
            ]
        ]
        # There are 4 types RCPT, EXPN, LOAN, S497.
        elections = {}
        for ed in dataAmount["Election Date"].unique():
            dataPerElectionDate = dataAmount[dataAmount["Election Date"] == ed]
            totalContributions = dataPerElectionDate[
                dataPerElectionDate["Rec_Type"] == "RCPT"
            ]["Amount"].sum().round(decimals=2) + dataPerElectionDate[
                dataPerElectionDate["Rec_Type"] == "LOAN"
            ][
                "Amount"
            ].sum().round(
                decimals=2
            )

            officeElections = []
            # Hardcoded from frontend data
            referendums = list(self.referendums.keys())
            for bi in dataPerElectionDate["Ballot Item"].unique():
                # This is not a valid election.
                if bi == "Mayoral Elections to Presidential Cycle":
                    continue
                dataPerElectionDateAndBallotItem = dataPerElectionDate[
                    dataPerElectionDate["Ballot Item"] == bi
                ]
                totalContributionsPerBallotItem = (
                    dataPerElectionDateAndBallotItem[
                        dataPerElectionDateAndBallotItem["Rec_Type"] == "RCPT"
                    ]["Amount"]
                    .sum()
                    .round(decimals=2)
                ) + dataPerElectionDateAndBallotItem[
                    dataPerElectionDateAndBallotItem["Rec_Type"] == "LOAN"
                ][
                    "Amount"
                ].sum().round(
                    decimals=2
                )
                if not "measure" in bi:
                    officeElections.append(
                        {
                            "Title": bi,
                            "CandidateIDs": self.get_ids(
                                dataPerElectionDateAndBallotItem["ID"].unique().tolist()
                            ),
                            "TotalContributions": totalContributionsPerBallotItem,
                        }
                    )
                else:
                    referendums.append(
                        {
                            "Title": bi,
                            "Description": bi,
                            "TotalContributions": totalContributionsPerBallotItem,
                        }
                    )
            elections = {
                "Title": "{} Election Cycle".format(ed.split("/")[2]),
                "Date": ed,
                "TotalContributions": totalContributions,
                "FundingByGeo": self.getFundingByGeo(dataPerElectionDate),
                "OfficeElections": officeElections,
                "Referendums": referendums,
            }
            electionShape["Elections"][ed] = elections
            electionShape["Metadata"] = self.metadata
        self.set_path_in_redis("elections", electionShape)
        return True

    def setCandidateShapeInRedis(self, electionDate="6/7/2022") -> bool:
        """
        Populate candidate shape into redis
        Redis data spec
        Candidates: [{
            ID: "councilmember-district-6;dev-davis;11-3-2020",
            Name: "Dev Davis",
            TotalRCPT: 300,
            TotalLOAN: 100,
            TotalEXPN: 100,
            FundingByType: {
                IND: 300,
                COM: 100
            },
            FundingByGeo: {
                CA: 300,
                NonSJ: 200,
                SJ: 100
                NonCA: 0
            }
            ExpenditureByType: {
        # TODO: We could have populated candidates for all election date but right now the spec only asks for the current year.
        """
        # TODO: TotalFunding - understand how TotalFunding is calculated and perhaps add TotalFunding
        data = self.data
        candidateShape = {"Candidates": []}
        dataAmount = data[
            [
                "Ballot Item",
                "CandidateControlledName",
                "Election Date",
                "Amount",
                "Rec_Type",
                "Entity_Cd",
                "Entity_Nam L",
                "Entity_Nam F",
                "Entity_City",
                "Entity_ST",
                "Expn_Code",
                "ID",
                "Cand_Nam L",
                "Sup_Opp_Cd",
                "Form_Type"
            ]
        ]
        candidateIDs = pd.unique(dataAmount["ID"])

        for cid in candidateIDs:
            candidate = dict()
            name = cid.split(";")[1].replace("_", " ")
            # This is for contributions to "independent" committees
            if name not in self.candidate_ids:
                continue
            candidate["ID"] = self.candidate_ids[name]
            candidate["Name"] = name
            dataPerCandidate = dataAmount[
                (dataAmount["CandidateControlledName"] == name)
                & (dataAmount["Election Date"] == electionDate)
            ]

            # For some reason, the Cand_Nam column uses Jake Tonkel instead of "Jacob "Jake" Tonkel".
            namePlaceholder = "Jake Tonkel" if name == "Jacob \"Jake\" Tonkel" else name
            candidateIndependentExpenditures = dataAmount[
                (dataAmount["Cand_Nam L"].str.lower() == namePlaceholder.lower())
                & (dataAmount["Election Date"] == electionDate)
                & (dataAmount["Form_Type"] == "D")
            ]

            # Get transaction by type
            totalByRecType = (
                dataPerCandidate.groupby(["Rec_Type"])[["Amount"]]
                .sum()
                .round(decimals=2)
                .to_dict()
            )
            candidate["TotalRCPT"] = totalByRecType["Amount"].get("RCPT", 0)
            candidate["TotalEXPN"] = totalByRecType["Amount"].get("EXPN", 0)
            candidate["TotalLOAN"] = totalByRecType["Amount"].get("LOAN", 0)
            candidate["TotalS497"] = totalByRecType["Amount"].get("S497", 0)
            candidate["TotalFunding"] = candidate.get("TotalRCPT", 0) + candidate.get("TotalLOAN", 0)

            totalBySupOpp = (
                candidateIndependentExpenditures.groupby(["Sup_Opp_Cd"])[["Amount"]]
                .sum()
                .round(decimals=2)
                .to_dict()
            )
            # Get funding by committee type
            recpDataPerCandidate = dataPerCandidate[
                dataPerCandidate["Rec_Type"].isin(["RCPT", "LOAN"])
            ]  # dataPerCandidate[(dataPerCandidate['Rec_Type'] == 'RCPT')
            totalByComType = (
                recpDataPerCandidate.groupby(["Entity_Cd"])[["Amount"]]
                .sum()
                .round(decimals=2)
                .to_dict()
            )
            candidate["FundingByType"] = totalByComType["Amount"]
            candidate["FundingByType"]["IndependentSupport"] = totalBySupOpp["Amount"].get("S")
            candidate["FundingByType"]["IndependentOppose"] = totalBySupOpp["Amount"].get("O")

            # Get funding by geo
            candidate["FundingByGeo"] = self.getFundingByGeo(recpDataPerCandidate)

            # Get expenditure by type
            expnDataPerCandidate = dataPerCandidate[
                dataPerCandidate["Rec_Type"] == "EXPN"
            ]
            totalByExpnType = (
                expnDataPerCandidate.groupby(["Expn_Code"])[["Amount"]]
                .sum()
                .round(decimals=2)
                .to_dict()
            )
            candidate["ExpenditureByType"] = totalByExpnType["Amount"]

            # Get Committees
            totalByCommittees = (
                recpDataPerCandidate[recpDataPerCandidate["Entity_Cd"] == "COM"]
                .groupby(["Entity_Nam L"])[["Amount"]]
                .sum()
                .round(decimals=2)
                .to_dict()
            )
            totalByCommitteesList = [
                {"Name": c, "TotalFunding": totalByCommittees["Amount"][c]}
                for c in totalByCommittees["Amount"]
            ]
            candidate["Committees"] = totalByCommitteesList

            candidateShape["Candidates"].append(candidate)
            candidateShape["Metadata"] = self.metadata
            logger.debug(candidateShape)
        self.set_path_in_redis("candidates", candidateShape)
        return True

    def getFundingByGeo(self, data):
        """
        Get total funding by GEO.

        :param data: A filtered Pandas table with Entity_City and Entity_ST columns populated.
        :return: Geo funding of the shape:
            {
                CA: 300,
                NonSJ: 200,
                SJ: 100
                NonCA: 0
            }

        """
        totalByGeoSJ = (
            data[data["Entity_City"] == "San Jose"]["Amount"].sum().round(decimals=2)
        )
        totalByGeoNonSJ = (
            data[data["Entity_City"] != "San Jose"]["Amount"].sum().round(decimals=2)
        )

        totalByGeoCA = data[data["Entity_ST"] == "CA"]["Amount"].sum().round(decimals=2)
        totalByGeoNonCA = (
            data[data["Entity_ST"] != "CA"]["Amount"].sum().round(decimals=2)
        )
        return {
            "SJ": totalByGeoSJ,
            "NonSJ": totalByGeoNonSJ,
            "CA": totalByGeoCA,
            "NonCA": totalByGeoNonCA,
        }


if __name__ == "__main__":
    # TODO: usage python aggregatedcsv2redis.py <filename> yet to be discussed
    filename = (
        sys.argv[1] if len(sys.argv) > 1 else "../scraper/aggregated_data/data.csv"
    )
    csv2Redis = Csv2Redis(filename=filename)
    csv2Redis.read_data_sheet()
    csv2Redis.setElectionShapeInRedis()
    csv2Redis.setCandidateShapeInRedis()
    csv2Redis.set_referendums_shape_in_redis()
    csv2Redis.set_metadata_shape_in_redis()
