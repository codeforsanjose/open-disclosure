const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allCandidate {
        edges {
          node {
            id
            Name
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  result.data.allCandidate.edges.forEach(({ node }) => {
    createPage({
      path: "/candidate/" + node.fields.slug,
      component: path.resolve("src/templates/candidate.js"),
      context: {
        name: node.Name,
      },
    })
  })
}
