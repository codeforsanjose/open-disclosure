import { Link, graphql } from "gatsby"

import React from "react"

export default function Candidates({ data }) {
  return (
    <ul>
      {data.allCandidate.edges.map(({ node }) => (
        <li key={node.id}>
          <Link to={"/candidate/" + node.fields.slug}>{node.Name}</Link>
        </li>
      ))}
    </ul>
  )
}

export const query = graphql`
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
`
