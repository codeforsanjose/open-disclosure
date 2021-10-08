import React from "react"
import { graphql } from "gatsby"
import styles from "./candidates.module.scss"
import Layout from "../components/layout"
import SideNav from "../components/sideNav"
import CandidatesListItem from "../components/candidatesListItem"
import useWindowIsLarge from "../common/hooks/useWindowIsLarge"
import SectionHeader from "../components/sectionHeader"
import { sortInDescendingOrder } from "../common/util/sorting"

export default function Candidates({ data, pageContext }) {
  const { electionDate } = pageContext
  const {
    officeElection: { Title, Candidates, fields },
  } = data
  const sortedCandidates = sortInDescendingOrder(
    Candidates,
    "TotalContributions"
  )
  let highestContributions = 0
  if (Candidates.length) {
    highestContributions = sortedCandidates[0].TotalContributions
  }

  return (
    <div className={styles.outerContainer}>
      <Layout
        title={Title}
        description={`Candidates running for election in the ${Title} race`}
        windowIsLarge={useWindowIsLarge()}
      >
        <div className={styles.innerContainer}>
          <SideNav
            pageTitle="Candidates"
            pageSubtitle="City of San José Candidates"
            selectedTitle={Title}
          >
            <div className={styles.candidateList}>
              <SectionHeader title={Title} />
              {sortedCandidates.map(candidate => (
                <CandidatesListItem
                  path={`/${electionDate}/candidate/${fields.slug}/${candidate.fields.slug}`}
                  key={candidate.fields.slug}
                  highestContributions={highestContributions}
                  {...candidate}
                />
              ))}
            </div>
          </SideNav>
        </div>
      </Layout>
    </div>
  )
}

export const query = graphql`
  query($officeElectionID: String) {
    officeElection(id: { eq: $officeElectionID }) {
      id
      Title
      TotalContributions
      Candidates {
        id
        Name
        TotalContributions
        fields {
          slug
        }
        jsonNode {
          ballotDesignation
          profilePhoto
        }
      }
      fields {
        slug
      }
    }
  }
`
