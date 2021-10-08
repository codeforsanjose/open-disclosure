const path = require(`path`)

const fetch = require("node-fetch")

const HOSTNAME = process.env.GATSBY_API_HOST
const CANDIDATE_NODE_TYPE = `Candidate`
const ELECTION_NODE_TYPE = `Election`
const METADATA_NODE_TYPE = `Metadata`
const OFFICE_ELECTION_NODE_TYPE = `OfficeElection`
const REFERENDUM_NODE_TYPE = `Referendum`
const DEFAULT_ELECTION_TARGET = "11/3/2020"

async function fetchEndpoint(endpoint) {
  const response = await fetch(
    `http://${HOSTNAME}/open-disclosure/api/v1.0/${endpoint}`
  )
  if (response.ok) {
    return await response.json()
  }
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
    createNode({
      ...candidate,
      TotalContributions: candidate.TotalFunding,
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
    const { id, name } = referendum

    createNode({
      ...referendum,
      id: createNodeId(`${REFERENDUM_NODE_TYPE}-${id}`),
      ID: id,
      Name: name,
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
  const election = electionData.Elections[DEFAULT_ELECTION_TARGET]
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
    node.OfficeElections &&
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
    node.Referendums &&
      node.Referendums.forEach(referendum => {
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
      Referendums: [Referendum] @link(by: "ID")
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
      Committees: [RefCommittee]
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
      description: String
      ballotLanguage: String
      electionDate: String
      Election: RefElectionCycle
      TotalSupport: Float
      TotalOppose: Float
      Support: RefCampaign
      Opposition: RefCampaign
      jsonNode: MeasuresJson @link(by: "id" from: "ID")
      fields: NodeFields 
    }

    type Metadata implements Node{
      DateProcessed: String
    }
  `)
}
