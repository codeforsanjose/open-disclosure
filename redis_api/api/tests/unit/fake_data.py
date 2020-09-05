"""Fake data for API"""


def get_candidates_shape():
    return {
        "Candidates": [
            {
                "Name": "Lindsay Lohan",
                "Elections": [
                    {
                        "ElectionCycle": "2020 Election Cycle",
                        "ElectionTitle": "District 9 Representative",
                        "Committees": [
                            {"Name": "Lindsay Lohan 2020", "TotalFunding": 300}
                        ],
                    }
                ],
            }
        ]
    }


def get_committees_shape():
    return {
        "CandidateOwned": [
            {
                "Name": "Lindsay Lohan 2020",
                "CandidateName": "Lindsay Lohan",
                "ElectionCycle": "2020 Election Cycle",
                "ElectionTitle": "District 9 Representative",
                "TotalIncome": 300,
                "TotalExpenditures": 200,
                "ItemizedIncome": [],
            }
        ],
        "ReferendumOwned": [
            {
                "Name": "Fun for Ballot Measure C",
                "ElectionCycle": "2020 Election Cycle",
                "ReferendumTitle": "Ballot Measure C",
                "TotalIncome": 700,
                "TotalExpenditures": 500,
                "ItemizedIncome": [],
            }
        ],
        "Other": [
            {
                "Name": "Gardeners for Tech",
                "TotalIncome": 1000,
                "TotalExpenditures": 300,
                "ItemizedIncome": [],
            }
        ],
    }


def get_elections_shape():
    return {
        "ElectionCycles": [
            {
                "Title": "2020 Election Cycle",
                "Date": "2020-11-15",
                "TotalContributions": 1000,
                "OfficeElections": [
                    {
                        "Title": "District 9 Representative",
                        "Candidates": ["Jake John", "Lindsay Lohan"],
                        "TotalContributions": 300,
                    }
                ],
                "Referendums": [
                    {
                        "Title": "Ballot Measure C",
                        "Description": "This ballot measure will allow people to have fun",
                        "Total Contributions": 700,
                    }
                ],
            }
        ]
    }


def get_referendums_shape():
    return {"Referendums": []}


def get_metadata_shape():
    return {"DateProcessed": "2020-07-20"}
