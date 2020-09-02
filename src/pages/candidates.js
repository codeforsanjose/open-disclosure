import { Link, graphql } from "gatsby"

import React from "react"

export default function Candidates({ data }) {
  // We're only interested in data for the upcoming election.
  const election = data.allElection.edges[0]
  return (
    <ul>
      {election.node.OfficeElections.map(({ Candidates }) =>
        Candidates.filter(Boolean).map(candidate => (
          <li key={candidate.id}>
            <Link to={"/candidate/" + candidate.fields.slug}>
              {candidate.Name}
            </Link>
          </li>
        ))
      )}
    </ul>
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
