const path = require(`path`)

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
              Title
              TotalContributions
              fields {
                slug
              }
            }
          }
        }
      }
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
        slug: node.fields.slug,
      },
    })
  })
  result.data.allElection.edges.forEach(({ node }) => {
    node.OfficeElections.forEach(election => {
      createPage({
        path: "/" + node.Date + "/candidates/" + election.fields.slug,
        component: path.resolve("src/templates/candidates.js"),
        context: {
          slug: election.fields.slug,
        },
      })
    })
  })
}
