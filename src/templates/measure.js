import React from "react"
import { graphql } from "gatsby"

export default function Measure({ data }) {
  const { name, ballotLanguage } = data.measuresJson
  return (
    <div>
      <header>
        <h1>{name}</h1>
      </header>
      <p>{ballotLanguage}</p>
    </div>
  )
}

export const query = graphql`
  query($id: String) {
    measuresJson(id: { eq: $id }) {
      name
      ballotLanguage
    }
  }
`
