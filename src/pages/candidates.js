import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import CandidatesListItem from "../components/candidatesListItem"

import React from "react"

export default function Candidates({ data }) {
  const election = data.allElection.edges[0]
  return (
    <Layout>
      <ul>
        {election.node.OfficeElections.map(({ Candidates }) =>
          Candidates.filter(Boolean).map(candidate => (
            <li key={candidate.id}>
              {/* Should link to candidate/${node.Date}/${candidateName}} */}
              <Link to={"/candidate/" + candidate.fields.slug}>
                <CandidatesListItem {...candidate} />
              </Link>
            </li>
          ))
        )}
      </ul>
    </Layout>
  )
}

export const query = graphql`
  query {
    allElection {
      edges {
        node {
          OfficeElections {
            Title
            TotalContributions
            Candidates {
              Name
              Elections {
                ElectionCycle
                ElectionTitle
                Committees {
                  Name
                  TotalFunding
                }
              }
              fields {
                slug
              }
            }
          }
        }
      }
    }
  }
`
