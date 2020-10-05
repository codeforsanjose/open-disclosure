const path = require(`path`)

const fetch = require("node-fetch")

const HOSTNAME =
  process.env.GATSBY_API_HOST ||
  (process.env.production
    ? "open-disclosure-api.codeforsanjose.com"
    : "localhost:5000")
const CANDIDATE_NODE_TYPE = `Candidate`
const ELECTION_NODE_TYPE = `Election`
const METADATA_NODE_TYPE = `Metadata`
const OFFICE_ELECTION_NODE_TYPE = `OfficeElection`
const REFERENDUM_NODE_TYPE = `Referendum`

const DUMMY_DATA = {
  candidates: {
    Candidates: [
      {
        ID: "3h2g45h3j",
        Name: "David Cohen",
        TotalRCPT: 91165.6,
        TotalEXPN: 78378.76,
        TotalLOAN: 86500,
        TotalS497: 7000,
        TotalFunding: 177665.6,
        FundingByType: { COM: 13899, IND: 71017.6, OTH: 5649, PTY: 600 },
        FundingByGeo: { SJ: 45159, NonSJ: 46006.6, CA: 82430.6, NonCA: 8735 },
        ExpenditureByType: {
          CMP: 4485.95,
          CVC: 250,
          FIL: 2965,
          LIT: 34625.3,
          MTG: 200,
          OFC: 1655.96,
          POS: 250.75,
          PRO: 7150,
          SAL: 17732.63,
          TEL: 27,
          WEB: 9036.17,
        },
        Committees: [
          { Name: "Bay Area Municipal Elections Committee", TotalFunding: 600 },
          { Name: "Beall for Board of Equalization 2022", TotalFunding: 600 },
          { Name: "Biehl for School Board 2018", TotalFunding: 99 },
          {
            Name: "Bricklayers and Allied Craftworkers Local No. 3",
            TotalFunding: 500,
          },
          {
            Name: "County Employee Management Association",
            TotalFunding: 1200,
          },
          { Name: "DRIVE Committee", TotalFunding: 600 },
          { Name: "IBEW 332 Education Fund", TotalFunding: 1200 },
          { Name: "IBEW Local 595 PAC", TotalFunding: 600 },
          { Name: "Laborers Local Union 270 PAC", TotalFunding: 1200 },
          { Name: "Marc Berman for Assembly 2020", TotalFunding: 100 },
          {
            Name: "Northern California District Council of Laborers PAC",
            TotalFunding: 600,
          },
          { Name: "Operating Engineers Local Union No. 3", TotalFunding: 600 },
          {
            Name: "Plumbers, Steamfitters & Refrigeration Fitters Local 393",
            TotalFunding: 600,
          },
          {
            Name: "Robert Wackowski for Alameda County Supervisor",
            TotalFunding: 600,
          },
          {
            Name: "SCC Probation Peace Officers' Union AFSCME-Local 1587",
            TotalFunding: 600,
          },
          {
            Name:
              "Santa Clara & San Benito Counties Building & Construction Trades Council PAC",
            TotalFunding: 1200,
          },
          {
            Name:
              "Sheet Metal Workers International Association Local Union #104",
            TotalFunding: 1200,
          },
          { Name: "Silicon Valley MEPS PAC", TotalFunding: 600 },
          { Name: "Teamsters Local Union 350 PAC", TotalFunding: 600 },
          {
            Name: "United Food & Commercial Workers Local 5",
            TotalFunding: 600,
          },
        ],
      },
      {
        ID: "cf90g8cii",
        Name: "Lan Diep",
        TotalRCPT: 226084.31,
        TotalEXPN: 166142.22,
        TotalLOAN: 10000,
        TotalS497: 5822.04,
        TotalFunding: 236084.31,
        FundingByType: { COM: 3250, IND: 162870.27, OTH: 59964.04 },
        FundingByGeo: {
          SJ: 85070.63,
          NonSJ: 141013.68,
          CA: 207225.5,
          NonCA: 18858.81,
        },
        ExpenditureByType: {
          CMP: 4227.74,
          CNS: 3000,
          FIL: 100,
          FND: 815.01,
          LIT: 91868.25,
          OFC: 4583.31,
          POS: 625,
          PRO: 22821.24,
          PRT: 18315.51,
          RFD: 1200,
          SAL: 14576.58,
          TRS: 852.71,
          WEB: 3156.87,
        },
        Committees: [
          { Name: "Build Jobs PAC", TotalFunding: 600 },
          { Name: "Business San Jose Chamber PAC", TotalFunding: 600 },
          { Name: "California Apartment Association PAC", TotalFunding: 600 },
          { Name: "HNTB Holdings Ltd. PAC", TotalFunding: 250 },
          { Name: "The Silicon Valley Organization PAC", TotalFunding: 1200 },
        ],
      },
      {
        ID: "089wegvb7",
        Name: 'Jacob "Jake" Tonkel',
        TotalRCPT: 107528.11,
        TotalEXPN: 53128.96,
        TotalLOAN: 24970,
        TotalFunding: 132498.11,
        FundingByType: { COM: 1700, IND: 94678.11, OTH: 11150 },
        FundingByGeo: {
          SJ: 55079.42,
          NonSJ: 52448.69,
          CA: 88117.29,
          NonCA: 19410.82,
        },
        ExpenditureByType: {
          CMP: 568.3,
          FIL: 3015,
          FND: 527.29,
          LIT: 26853.45,
          MBR: 154.68,
          OFC: 48.92,
          POL: 4851.98,
          POS: 187,
          RAD: 2000,
          TEL: 2000,
          WEB: 12922.34,
        },
        Committees: [
          { Name: "Alex Lee for State Assembly", TotalFunding: 600 },
          { Name: "Kenneth Mejia For Congress", TotalFunding: 500 },
          { Name: "Silicon Valley MEPS PAC", TotalFunding: 600 },
        ],
      },
      {
        ID: "456hjkl2l",
        Name: "Dev Davis",
        TotalRCPT: 237956.88,
        TotalEXPN: 165202.96,
        TotalLOAN: 20000,
        TotalS497: 4076,
        TotalFunding: 257956.88,
        FundingByType: { COM: 6000, IND: 188943, OTH: 43013.88 },
        FundingByGeo: {
          SJ: 129936.88,
          NonSJ: 108020,
          CA: 232746.88,
          NonCA: 5210,
        },
        ExpenditureByType: {
          CMP: 8268.24,
          CNS: 7061.17,
          FIL: 3015,
          FND: 998.88,
          LIT: 61901.42,
          MTG: 487.8,
          OFC: 7382.47,
          POL: 22000,
          POS: 369.74,
          PRO: 16524.2,
          PRT: 5100,
          RAD: 18160.25,
          RFD: 2499,
          TEL: 10002.8,
          WEB: 1431.99,
        },
        Committees: [
          {
            Name:
              "Associated Builders and Contractors Northern California Chapter PAC",
            TotalFunding: 1200,
          },
          { Name: "Bay Area Municipal Election Committee", TotalFunding: 600 },
          { Name: "Build Jobs PAC", TotalFunding: 600 },
          { Name: "California Apartment Association", TotalFunding: 600 },
          { Name: "Charles Stone for Belmont City 2018", TotalFunding: 600 },
          { Name: "San Jose Chamber PAC", TotalFunding: 600 },
          { Name: "The Silicon Valley Organization PAC", TotalFunding: 1200 },
          {
            Name: "Western Manufactured Housing Communities Assn.",
            TotalFunding: 600,
          },
        ],
      },
    ],
  },
  elections: {
    Elections: {
      "11/3/2020": {
        Title: "2020 Election Cycle",
        Date: "11/3/2020",
        TotalContributions: 662734.9,
        OfficeElections: [
          {
            Title: "Councilmember District 4",
            CandidateIDs: ["3h2g45h3j", "cf90g8cii"],
            TotalContributions: 317249.91,
          },
          {
            Title: "Councilmember District 6",
            CandidateIDs: ["089wegvb7", "456hjkl2l"],
            TotalContributions: 345484.99,
          },
        ],
        ReferendumIDs: ["295owncuj3", "038qishux7"],
      },
    },
  },
  referendums: {
    Referendums: [
      {
        ID: "295owncuj3",
        Name: "Ballot Measure H",
        Election: { Date: "11/3/2020", ElectionCycle: "2020 Election Cycle" },
        TotalSupport: 177665.6,
        TotalOppose: 177665.6,
        Support: {
          TotalRCPT: 91165.6,
          TotalEXPN: 78378.76,
          TotalLOAN: 86500,
          TotalS497: 7000,
          TotalFunding: 177665.6,
          FundingByType: {
            COM: 13899,
            IND: 71017.6,
            OTH: 5649,
            PTY: 600,
          },
          FundingByGeo: {
            SJ: 45159,
            NonSJ: 46006.6,
            CA: 82430.6,
            NonCA: 8735,
          },
          ExpenditureByType: {
            CMP: 4485.95,
            CVC: 250,
            FIL: 2965,
            LIT: 34625.3,
            MTG: 200,
            OFC: 1655.96,
            POS: 250.75,
            PRO: 7150,
            SAL: 17732.63,
            TEL: 27,
            WEB: 9036.17,
          },
          Committees: [
            {
              Name: "For Measure H",
              TotalContributions: 12345,
            },
          ],
          Contributors: [
            {
              Name: "Some Person",
              ContributionType: "Individual",
              Occupation: "Developer",
              Employer: "Code for San Jose",
              ZipCode: 12345,
              Contributions: 900,
              Date: "11-3-20",
            },
            {
              Name: "Some Union Local 123",
              Occupation: null,
              Employer: null,
              ZipCode: 12345,
              Contributions: 900,
              Date: "11-3-20",
            },
          ],
        },
        Opposition: {
          TotalRCPT: 91165.6,
          TotalEXPN: 78378.76,
          TotalLOAN: 86500,
          TotalS497: 7000,
          TotalFunding: 177665.6,
          FundingByType: {
            COM: 13899,
            IND: 71017.6,
            OTH: 5649,
            PTY: 600,
          },
          FundingByGeo: {
            SJ: 45159,
            NonSJ: 46006.6,
            CA: 82430.6,
            NonCA: 8735,
          },
          ExpenditureByType: {
            CMP: 4485.95,
            CVC: 250,
            FIL: 2965,
            LIT: 34625.3,
            MTG: 200,
            OFC: 1655.96,
            POS: 250.75,
            PRO: 7150,
            SAL: 17732.63,
            TEL: 27,
            WEB: 9036.17,
          },
          Committees: [
            {
              Name: "Against Measure H",
              TotalContributions: 89403,
            },
          ],
          Contributors: [
            {
              Name: "Some Person",
              ContributionType: "Individual",
              Occupation: "Developer",
              Employer: "Code for San Jose",
              ZipCode: 12345,
              Contributions: 900,
              Date: "11-3-20",
            },
            {
              Name: "Some Union Local 123",
              Occupation: null,
              Employer: null,
              ZipCode: 12345,
              Contributions: 900,
              Date: "11-3-20",
            },
          ],
        },
      },
      {
        ID: "038qishux7",
        Name: "Ballot Measure G",
        Election: { Date: "11/3/2020", ElectionCycle: "2020 Election Cycle" },
        TotalSupport: 0,
        TotalOppose: 0,
        Support: {
          TotalRCPT: 91165.6,
          TotalEXPN: 78378.76,
          TotalLOAN: 86500,
          TotalS497: 7000,
          TotalFunding: 177665.6,
          FundingByType: {
            COM: 13899,
            IND: 71017.6,
            OTH: 5649,
            PTY: 600,
          },
          FundingByGeo: {
            SJ: 45159,
            NonSJ: 46006.6,
            CA: 82430.6,
            NonCA: 8735,
          },
          ExpenditureByType: {
            CMP: 4485.95,
            CVC: 250,
            FIL: 2965,
            LIT: 34625.3,
            MTG: 200,
            OFC: 1655.96,
            POS: 250.75,
            PRO: 7150,
            SAL: 17732.63,
            TEL: 27,
            WEB: 9036.17,
          },
          Committees: [
            {
              Name: "For Measure G",
              TotalContributions: 89403,
            },
          ],
          Contributors: [
            {
              Name: "Some Person",
              ContributionType: "Individual",
              Occupation: "Developer",
              Employer: "Code for San Jose",
              ZipCode: 12345,
              Contributions: 900,
              Date: "11-3-20",
            },
            {
              Name: "Some Union Local 123",
              Occupation: null,
              Employer: null,
              ZipCode: 12345,
              Contributions: 900,
              Date: "11-3-20",
            },
          ],
        },
        Opposition: {
          TotalRCPT: 91165.6,
          TotalEXPN: 78378.76,
          TotalLOAN: 86500,
          TotalS497: 7000,
          TotalFunding: 177665.6,
          FundingByType: {
            COM: 13899,
            IND: 71017.6,
            OTH: 5649,
            PTY: 600,
          },
          FundingByGeo: {
            SJ: 45159,
            NonSJ: 46006.6,
            CA: 82430.6,
            NonCA: 8735,
          },
          ExpenditureByType: {
            CMP: 4485.95,
            CVC: 250,
            FIL: 2965,
            LIT: 34625.3,
            MTG: 200,
            OFC: 1655.96,
            POS: 250.75,
            PRO: 7150,
            SAL: 17732.63,
            TEL: 27,
            WEB: 9036.17,
          },
          Committees: [
            {
              Name: "Against Measure G",
              TotalContributions: 89403,
            },
          ],
          Contributors: [
            {
              Name: "Some Person",
              ContributionType: "Individual",
              Occupation: "Developer",
              Employer: "Code for San Jose",
              ZipCode: 12345,
              Contributions: 900,
              Date: "11-3-20",
            },
            {
              Name: "Some Union Local 123",
              Occupation: null,
              Employer: null,
              ZipCode: 12345,
              Contributions: 900,
              Date: "11-3-20",
            },
          ],
        },
      },
    ],
  },
  metadata: {
    DateProcessed: "2020-09-07",
  },
}

async function fetchEndpoint(endpoint) {
  try {
    const response = await fetch(
      `https://open-disclosure-api.darrenpham.info/open-disclosure/api/v1.0/${endpoint}`
      // `http://${HOSTNAME}/open-disclosure/api/v1.0/${endpoint}`
    )
    if (response.ok) {
      // NOTE: If `gatsby develop` gives errors related to errors like `Cannot query field "fields" on type "OfficeElection"`, comment return DUMMY_DATA[endpoints] back in
      return DUMMY_DATA[endpoint]
      // return await response.json()
    }
  } catch (networkError) {
    console.warn(
      "Unable to reach the API server at " +
        HOSTNAME +
        ", falling back to mock data"
    )
    console.info(
      "Use the environment variable GATSBY_API_HOST to use a different hostname for the API server"
    )
  }
  return DUMMY_DATA[endpoint]
}

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions

  const [
    candidateData,
    electionData,
    referendumData,
    metadata,
  ] = await Promise.all([
    fetchEndpoint("candidates"),
    fetchEndpoint("elections"),
    fetchEndpoint("referendums"),
    fetchEndpoint("metadata"),
  ])
  candidateData.Candidates.forEach(candidate => {
    const { TotalRCPT } = candidate
    // We're only including RCPT right now because the API only uses RCPT for aggregations
    // TODO #171 Update to include LOAN
    const TotalContributions = TotalRCPT
    createNode({
      ...candidate,
      TotalContributions,
      TotalFunding: TotalContributions, // TODO #171 Remove this override
      id: createNodeId(`${CANDIDATE_NODE_TYPE}-${candidate.ID}`),
      parent: null,
      children: [],
      internal: {
        type: CANDIDATE_NODE_TYPE,
        content: JSON.stringify(candidate),
        contentDigest: createContentDigest(candidate),
      },
    })
  })
  referendumData.Referendums.map(referendum => {
    const id = createNodeId(`${REFERENDUM_NODE_TYPE}-${referendum.ID}`)

    createNode({
      ...referendum,
      id,
      parent: null,
      children: [],
      internal: {
        type: REFERENDUM_NODE_TYPE,
        content: JSON.stringify(referendum),
        contentDigest: createContentDigest(referendum),
      },
    })
    return id
  })
  const election = electionData.Elections["11/3/2020"]
  createNode({
    ...election,
    OfficeElections: election.OfficeElections.map(officeElection => {
      const id = createNodeId(
        `${OFFICE_ELECTION_NODE_TYPE}-${officeElection.Title}`
      )
      createNode({
        ...officeElection,
        id,
        parent: null,
        children: [],
        internal: {
          type: OFFICE_ELECTION_NODE_TYPE,
          content: JSON.stringify(officeElection),
          contentDigest: createContentDigest(officeElection),
        },
      })
      return id
    }),
    id: createNodeId(`${ELECTION_NODE_TYPE}-${election.Date}`),
    parent: null,
    children: [],
    internal: {
      type: ELECTION_NODE_TYPE,
      content: JSON.stringify(election),
      contentDigest: createContentDigest(election),
    },
  })
  createNode({
    ...metadata,
    id: createNodeId(`${METADATA_NODE_TYPE}`),
    parent: null,
    children: [],
    internal: {
      type: METADATA_NODE_TYPE,
      content: JSON.stringify(metadata),
      contentDigest: createContentDigest(metadata),
    },
  })
  return
}
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allElection {
        edges {
          node {
            Title
            Date
            TotalContributions
            OfficeElections {
              id
              Title
              TotalContributions
              fields {
                slug
              }
              Candidates {
                ID
                Name
                fields {
                  slug
                }
              }
            }
            Referendums {
              ID
              Name
              fields {
                slug
              }
            }
          }
        }
      }
    }
  `)
  result.data.allElection.edges.forEach(({ node }) => {
    node.OfficeElections.forEach(election => {
      createPage({
        path: `/${node.Date}/candidates/${election.fields.slug}`,
        component: path.resolve("src/templates/candidates.js"),
        context: {
          slug: election.fields.slug,
          officeElectionID: election.id,
          electionDate: node.Date,
        },
      })
      election.Candidates.forEach(candidate => {
        createPage({
          path: `/${node.Date}/candidate/${election.fields.slug}/${candidate.fields.slug}`,
          component: path.resolve("src/templates/candidate.js"),
          context: {
            slug: candidate.fields.slug,
            id: candidate.ID,
          },
        })
      })
    })
    node.Referendums.forEach(referendum => {
      console.log(referendum)
      createPage({
        path: `/${node.Date}/referendums/${referendum.fields.slug}`,
        component: path.resolve("src/templates/referendum.js"),
        context: {
          slug: referendum.fields.slug,
          id: referendum.ID,
        },
      })
    })
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type NodeFields {
      slug: String
    }

    type Committee {
      Name: String
      TotalFunding: String
    }

    type GeoBreakdown {
      SJ: Float
      NonSJ: Float
      CA: Float
      NonCA: Float
    }

    type FundingTypeBreakdown {
      IND: Float
      COM: Float
      OTH: Float
      PTY: Float
      SCC: Float
    }

    type ExpenditureTypeBreakdown {
      SAL: Float
      CMP: Float
      CNS: Float
      CVC: Float
      FIL: Float
      FND: Float
      LIT: Float
      MBR: Float
      MTG: Float
      OFC: Float
      POL: Float
      POS: Float
      PRO: Float
      PRT: Float
      RAD: Float
      RFD: Float
      TEL: Float
      TRS: Float
      WEB: Float
    }

    type Candidate implements Node {
      id: ID!
      ID: String!
      Name: String!
      Committees: [Committee]
      TotalContributions: Float 
      TotalFunding: Float
      TotalEXPN: Float
      TotalLOAN: Float
      TotalRCPT: Float
      FundingByGeo: GeoBreakdown
      FundingByType: FundingTypeBreakdown
      ExpenditureByType: ExpenditureTypeBreakdown
      jsonNode: CandidatesJson @link(by: "id" from: "ID")
      fields: NodeFields
    }

    type CandidatesJson implements Node {
      id: ID!
      name: String!
      twitter: String
      seat: String
      ballotDesignation: String
      website: String
      votersEdge: String
      apiNode: Candidate @link(by: "ID" from: "id")
    }

    type Election implements Node {
      Title: String!
      Date: String 
      TotalContributions: Float 
      OfficeElections: [OfficeElection] @link
      Referendums: [Referendum] @link(by: "ID" from: "ReferendumIDs")
      fields: NodeFields
    }

    type OfficeElection implements Node {
      Candidates: [Candidate] @link(by: "ID" from: "CandidateIDs")
      Title: String
      TotalContributions: Float
      fields: NodeFields
    }

    type RefElectionCycle {
      Date: String
      ElectionCycle: String
    }

    type RefCommittee {
      Name: String
      TotalFunding: Float
    }

    type RefContributor {
      Name: String
      ContributionType: String
      Occupation: String
      Employer: String
      ZipCode: String
      Contributions: Float
      Date: String
    }

    type RefCampaign {
      TotalFunding: Float
      TotalEXPN: Float
      TotalLOAN: Float
      TotalRCPT: Float
      FundingByGeo: GeoBreakdown
      FundingByType: FundingTypeBreakdown
      ExpenditureByType: ExpenditureTypeBreakdown
      Committee: [RefCommittee]
      Contributors: [RefContributor]
    }

    type MeasuresJson implements Node {
      electionDate: String!
      name: String!
      description: String!
      ballotLanguage: String!
      href: String
    }

    type Referendum implements Node {
      id: ID
      ID: String
      Name: String!
      Election: RefElectionCycle
      TotalSupport: Float
      TotalOppose: Float
      Support: RefCampaign
      Oppose: RefCampaign
      jsonNode: MeasuresJson @link(by: "id" from: "ID")
      fields: NodeFields 
    }

    type Metadata implements Node{
      DateProcessed: String!
    }
  `)
}
