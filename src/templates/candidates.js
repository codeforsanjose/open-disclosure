import React from "react"
import { graphql } from "gatsby"
import styles from "./candidates.module.scss"
import Layout from "../components/layout"
import SideNav from "../components/sideNav"
import CandidatesListItem from "../components/candidatesListItem"
import useWindowIsLarge from "../common/hooks/useWindowIsLarge"

export default function Candidates({ data }) {
  const election = data.allElection.edges[0].node

  // Should link to /{node.Date}/candidate/${candidateName}}

  return (
    <div className={styles.outerContainer}>
      <Layout windowIsLarge={useWindowIsLarge()}>
        <div className={styles.innerContainer}>
          <SideNav>
            {election.OfficeElections.map(({ Candidates }) =>
              Candidates.filter(Boolean).map(candidate => (
                <CandidatesListItem {...candidate} />
              ))
            )}
          </SideNav>
        </div>
      </Layout>
    </div>
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
              id
              Name
              fields {
                slug
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
`
