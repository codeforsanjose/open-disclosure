import React from "react"
import { graphql } from "gatsby"
import styles from "./candidates.module.scss"
import Layout from "../components/layout"
import SideNav from "../components/sideNav"
import CandidatesListItem from "../components/candidatesListItem"
import useWindowIsLarge from "../common/hooks/useWindowIsLarge"
import SectionHeader from "../components/sectionHeader"

export default function Candidates({ data, pageContext }) {
  const { electionDate } = pageContext
  const { officeElection } = data
  return (
    <div className={styles.outerContainer}>
      <Layout windowIsLarge={useWindowIsLarge()}>
        <div className={styles.innerContainer}>
          <SideNav
            pageTitle="Candidates"
            pageSubtitle="City of San José Candidates"
          >
            <div className={styles.candidateList}>
              <SectionHeader title={officeElection.Title} />
              {officeElection.Candidates.map(candidate => (
                <CandidatesListItem
                  path={`/${electionDate}/candidate/${officeElection.fields.slug}/${candidate.fields.slug}`}
                  key={candidate.fields.slug}
                  electionTotal={officeElection.TotalContributions}
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
