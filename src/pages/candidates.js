import React from "react"

export default function Candidates({ data }) {
  return (
    <ul>
      {data.allCandidates.edges
        .filter(({ node }) => node.id !== "dummy")
        .map(({ node }) => (
          <li key={node.id}>{node.Name}</li>
        ))}
    </ul>
  )
}

export const query = graphql`
  query {
    allCandidates {
      edges {
        node {
          id
          Name
        }
      }
    }
  }
`
