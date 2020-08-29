const CANDIDATE_NODE_TYPE = `candidate`

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
  getNodesByType,
}) => {
  const { createNode } = actions

  // This can become fallback data?
  const data = {
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
