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
            Referendums {
              Title
              Description
              Total_Contributions
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
      allCandidatesJson {
        edges {
          node {
            id
            name
            fields {
              slug
            }
          }
        }
      }
    }
  `)
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
  result.data.allElection.edges.forEach(({ node }) => {
    node.OfficeElections.forEach(election => {
      createPage({
        path: "/referendums",
        component: path.resolve("src/components/measuresDetails.jsx"),
      })
    })
  })
  result.data.allCandidatesJson.edges.forEach(({ node }) => {
    createPage({
      path: "/candidate/" + node.fields.slug,
      component: path.resolve("src/templates/candidate.js"),
      context: {
        slug: node.fields.slug,
        id: node.id,
      },
    })
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type Committee {
      Name: String
      TotalFunding: String
    }

    type Candidate implements Node {
      id: ID!
      Name: String!
      Committees: [Committee]
    }

    type CandidatesJson implements Node {
      id: ID!
      name: String!
      twitter: String
      seat: String
      apiData: Candidate @link(by: "ID" from: "id")
    }

    type Election implements Node {
      Title: String!
      Date: String 
      TotalContributions: String 
      OfficeElections: [OfficeElection] @link(by: "Title")
    }

    type OfficeElection implements Node {
      Candidates: [Candidate] @link(by: "Name")
      Title: String
      TotalContributions: String
    }

    type Metadata implements Node{
      DateProcessed: String!
    }
  `)
}
