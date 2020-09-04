import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SideNav from "../components/sideNav"
import CandidatesListItem from "../components/candidatesListItem"
import useWindowIsLarge from "../common/hooks/useWindowIsLarge"

export default function Candidates({ data }) {
  const election = data.allElection.edges[0].node

  // Should link to candidate/${node.Date}/${candidateName}}

  return (
    <Layout windowIsLarge={useWindowIsLarge()}>
      <SideNav>
        {election.OfficeElections.map(({ Candidates }) =>
          Candidates.filter(Boolean).map(candidate => (
            <Link key={candidate.id} to={"/candidate/" + candidate.fields.slug}>
              <CandidatesListItem {...candidate} />
            </Link>
          ))
        )}
      </SideNav>
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
