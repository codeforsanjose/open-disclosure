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
                        "Title": "District 4 Representative",
                        "CandidateIDs": ["councilmember-district-4;david-cohen;11-3-2020",
                        "councilmember-district-4;lan-diep;11-3-2020"],
                        "TotalContributions": 300,
                    },
                    {
                        "Title": "District 6 Representative",
                        "CandidateIDs": ["councilmember-district-6;dev-davis;11-3-2020",
                        "councilmember-district-6;jacob-\"jake\"-tonkel;11-3-2020"
                        ],
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
    return {
	"Referendums": [
	{
		"Name": "Ballot Measure X",
		"Election":
		{
			"ElectionCycle": "2020 Election Cycle"	
		},
        "Committee": [{ # Any committees linked to that candidate and election.
			"Name": "For Measure X",
			"TotalFunding": 300
		}, 
        {
			"Name": "Against Measure X",
			"TotalFunding": 300
		}]
	},
    {
		"Name": "Ballot Measure Y",
		"Election":
		{
			"ElectionCycle": "2020 Election Cycle"	
		},
        "Committee": [{ 
			"Name": "For Measure Y",
			"TotalFunding": 456
		}, {
			"Name": "Against Measure Y",
			"TotalFunding": 799
		}]
	},
    {
		"Name": "Ballot Measure Z",
		"Election":
		{
			"ElectionCycle": "2020 Election Cycle"	
		},
        "Committee": [{ 
			"Name": "For Measure Z",
			"TotalFunding": 78678
		}, {
			"Name": "Against Measure Z",
			"TotalFunding": 22454
		}]
	}]
}



def get_metadata_shape():
    return {"DateProcessed": "2020-07-20"}
