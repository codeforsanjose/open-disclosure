const fetch = require("node-fetch")

// TODO Add dev/prod variations
const HOSTNAME = process.env.GATSBY_API_HOST || "localhost:5000"
const CANDIDATE_NODE_TYPE = `candidate`

const DUMMY_DATA = {
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
}

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions

  let data
  try {
    const response = await fetch(
      `http://${HOSTNAME}/open-disclosure/api/v1.0/candidates`
    )
    data = await response.json()
  } catch (networkError) {
    console.warn(
      "Unable to reach the API server at " +
        HOSTNAME +
        ", falling back to mock data"
    )
    console.info(
      "Use the environment variable GATSBY_API_HOST to use a different hostname for the API server"
    )
    // Use dummy data as a fallback in case the API isn't available.
    // TODO This is only for development purposes - get rid of this
    data = DUMMY_DATA
  }

  data.Candidates.forEach(candidate => {
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
  return
}
