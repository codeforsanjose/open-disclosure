import { graphql } from "gatsby"
import React from "react"

import { TotalAmountPanelItem } from "../components/totalAmountItem"
import Layout from "../components/layout"
import SideNav from "../components/sideNav"
import SectionHeader from "../components/sectionHeader"
import styles from "./referendum.module.scss"
import useWindowIsLarge from "../common/hooks/useWindowIsLarge"
import VotersEdgeIcon from "../../static/images/votersEdge.png"
import CommitteeCharts from "../components/committeeCharts"

const supportingCommittees = [
  {
    title: "Yes on Measure E! San José Neighbors for Parks & People",
    value: 500000,
  },
  {
    title: "Yes on Measure E! San José Neighbors for Parks & People",
    value: 400000,
  },
  {
    title: "Yes on Measure E! San José Neighbors for Parks & People",
    value: 14000,
  },
]

function MeasureDetails({ data }) {
  const measure = data.referendum
  const { jsonNode } = measure
  console.log(measure, jsonNode)
  return (
    <Layout windowIsLarge={useWindowIsLarge()}>
      <SideNav
        isReferendum
        headerBackground="green"
        pageTitle="Measures"
        pageSubtitle="City of San José Ballot Measures"
        selectedTitle={measure.Name}
      >
        <div className={styles.mainSection}>
          <SectionHeader
            isPageHeader
            title={measure.Name}
            subtitle={jsonNode.description}
          />
          <section>
            <div className={styles.aboutSection}>
              <p className={styles.aboutTitle}>
                <span className={styles.measurePurpose}>
                  What would this measure do?
                </span>
              </p>
              <p className={styles.aboutText}>{jsonNode.ballotLanguage}</p>
              <div className={styles.aboutLinks}>
                <a href={jsonNode.href} className={styles.aboutLink}>
                  <img
                    alt="External link icon"
                    src={VotersEdgeIcon}
                    className={styles.icon}
                  />
                  More information on Voter's Edge
                </a>
              </div>
            </div>
          </section>
          <section>
            <SectionHeader title="Fundraising totals" />
            <div className={styles.totals}>
              <TotalAmountPanelItem type="measureSupport" total={654876} />
              <TotalAmountPanelItem type="measureOppose" total={383254} />
            </div>
          </section>
          <CommitteeCharts
            id="measureSupport"
            type="contributions"
            total={654876}
            data={supportingCommittees}
          />
          <CommitteeCharts
            id="measureOppose"
            type="expenditures"
            total={654876}
            data={supportingCommittees}
          />
        </div>
      </SideNav>
    </Layout>
  )
}

export const query = graphql`
  query($id: String) {
    referendum(id: { eq: $id }) {
      id
      Name
      Committee {
        Name
        TotalFunding
      }
      fields {
        slug
      }
      jsonNode {
        ballotLanguage
        description
        electionDate
        name
        href
      }
    }
  }
`

export default MeasureDetails
