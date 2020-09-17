const fetch = require("node-fetch")

// TODO Add dev/prod variations
const HOSTNAME = process.env.GATSBY_API_HOST || "localhost:5000"
const CANDIDATE_NODE_TYPE = `Candidate`
const ELECTION_NODE_TYPE = `Election`
const METADATA_NODE_TYPE = `Metadata`
const OFFICE_ELECTION_NODE_TYPE = `OfficeElection`

const DUMMY_DATA = {
  candidates: {
    Candidates: [
      {
        ID: "councilmember-district-6;dev-davis;11-3-2020",
        Name: "Dev Davis",
        Committees: [
          {
            ID: "john-pisacane-&-teresa-newell;11-3-2020",
            Name: "John Pisacane & Teresa Newell",
            TotalFunding: 500.0,
          },
          {
            ID: "mina-acharya;11-3-2020",
            Name: "Mina Acharya",
            TotalFunding: 600.0,
          },
          {
            ID: "sanjeev-acharya;11-3-2020",
            Name: "Sanjeev Acharya",
            TotalFunding: 600.0,
          },
        ],
      },
      {
        ID: 'councilmember-district-6;jacob-"jake"-tonkel;11-3-2020',
        Name: 'Jacob "Jake" Tonkel',
        Committees: [
          {
            ID: "gary-abreim;11-3-2020",
            Name: "Gary Abreim",
            TotalFunding: 25.0,
          },
          {
            ID: "blake-adams;11-3-2020",
            Name: "Blake Adams",
            TotalFunding: 125.0,
          },
          {
            ID: "vicki-adams;11-3-2020",
            Name: "Vicki Adams",
            TotalFunding: 31.46,
          },
        ],
      },
    ],
  },
  elections: {
    ElectionCycles: [
      {
        Title: "2020 Election Cycle",
        Date: "2020-11-03",
        TotalContributions: 1000,
        OfficeElections: [
          {
            Title: "Councilmember District 6",
            Candidates: ['Jacob "Jake" Tonkel', "Dev Davis"],
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
  metadata: {
    DateProcessed: "2020-09-07",
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
  electionData.ElectionCycles.forEach(election => {
    election.OfficeElections.forEach(officeElection => {
      createNode({
        ...officeElection,
        id: createNodeId(`${OFFICE_ELECTION_NODE_TYPE}-${election.id}`),
        parent: null,
        children: [],
        internal: {
          type: OFFICE_ELECTION_NODE_TYPE,
          content: JSON.stringify(election),
          contentDigest: createContentDigest(election),
        },
      })
    })
    createNode({
      ...election,
      OfficeElections: election.OfficeElections.map(
        // This is the field we're linking by.
        // TODO Could we just do this all inline somehow?
        officeElection => officeElection.Title
      ),
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
