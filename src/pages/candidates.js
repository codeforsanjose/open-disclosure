import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import CandidatesListItem from "../components/candidatesListItem"

import React from "react"

export default function Candidates({ data }) {
  const election = data.allElection.edges[0].node
  const candidateInfo = data.allCandidate.edges.map(edge => edge.node)
  return (
    <Layout>
      <ul>
        {/* We will have to know which office is currently being run for */}
        {election.OfficeElections[0].Candidates.map(name => {
          const candidate = candidateInfo.find(node => node.Name === name)
          const slug = name
            .split(" ")
            .join("-")
            .toLowerCase()

          return (
            <li key={slug}>
              {/* Should link to candidate/${node.Date}/${candidateName}} */}
              <Link to={"/candidate/" + slug}>
                <CandidatesListItem {...candidate} />
              </Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export const query = graphql`
  query {
    allElection {
      edges {
        node {
          id
          Title
          Date
          TotalContributions
          OfficeElections {
            Title
            Candidates
            TotalContributions
          }
          Referendums {
            Title
            Description
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
`
