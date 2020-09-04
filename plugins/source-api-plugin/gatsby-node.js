const fetch = require("node-fetch")

// TODO Add dev/prod variations
const HOSTNAME = process.env.GATSBY_API_HOST || "localhost:5000"
const CANDIDATE_NODE_TYPE = `Candidate`
const ELECTION_NODE_TYPE = `Election`
const METADATA_NODE_TYPE = `Metadata`

const DUMMY_DATA = {
  candidates: {
    Candidates: [
      {
        Name: "Lindsay Lohan",
        Elections: [
          {
            ElectionCycle: "2020 Election Cycle",
            ElectionTitle: "District 9 Representative",
            Committees: [{ Name: "Lindsay Lohan 2020", TotalFunding: 300 }],
          },
        ],
      },
    ],
  },
  elections: {
    ElectionCycles: [
      {
        Title: "2020 Election Cycle",
        Date: "2020-11-15",
        TotalContributions: 1000,
        OfficeElections: [
          {
            Title: "District 9 Representative",
            Candidates: ["Jake John", "Lindsay Lohan"],
            TotalContributions: 300,
          },
        ],
        Referendums: [
          {
            Title: "Ballot Measure C",
            Description: "This ballot measure will allow people to have fun",
            "Total Contributions": 700,
          },
        ],
      },
    ],
  },
}

async function fetchEndpoint(endpoint) {
  try {
    const response = await fetch(
      `http://${HOSTNAME}/open-disclosure/api/v1.0/${endpoint}`
    )
    if (response.ok) {
      return await response.json()
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

  const [candidateData, electionData, metadata] = await Promise.all([
    fetchEndpoint("candidates"),
    fetchEndpoint("elections"),
    fetchEndpoint("metadata"),
  ])
  candidateData.Candidates.forEach(candidate => {
    createNode({
      ...candidate,
      id: createNodeId(`${CANDIDATE_NODE_TYPE}-${candidate.id}`),
      parent: null,
      children: [],
      internal: {
        type: CANDIDATE_NODE_TYPE,
        content: JSON.stringify(candidate),
        contentDigest: createContentDigest(candidate),
      },
    })
  })
  electionData.ElectionCycles.forEach(election => {
    createNode({
      ...election,
      id: createNodeId(`${ELECTION_NODE_TYPE}-${election.id}`),
      parent: null,
      children: [],
      internal: {
        type: ELECTION_NODE_TYPE,
        content: JSON.stringify(election),
        contentDigest: createContentDigest(election),
      },
    })
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

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type Candidate implements Node {
      id: ID!
      Name: String
      Elections: [CandidateElection]
    }

    type CandidateElection {
      ElectionCycle: String
      ElectionTitle: String
      Committees: [Committee]
    }

    type Committee {
      Name: String
      TotalFunding: String
    }

    type Election implements Node {
      Title: String!
      Date: String 
      TotalContributions: String 
      OfficeElections: [OfficeElection]
    }

    type OfficeElection {
      Candidates: [Candidate] @link(by: "Name")
      Title: String
      TotalContributions: String
    }

    type Metadata implements Node{
      DateProcessed: String!
    }
  `)
}
