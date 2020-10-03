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
            subtitle="***TO REMOVE: PLACEHOLDER ONE LINE DESC OF MEASURE***"
          />
          <section>
            <div className={styles.aboutSection}>
              <p className={styles.aboutTitle}>
                <span className={styles.measurePurpose}>
                  What would this measure do?
                </span>
              </p>
              <p className={styles.aboutText}>{measure?.Description ?? ""}</p>
              <div className={styles.aboutLinks}>
                <a
                  href="https://votersedge.org/ca"
                  className={styles.aboutLink}
                >
                  <img
                    alt="External link icon"
                    src={VotersEdgeIcon}
                    className={styles.icon}
                  />
                  More information on Voter&apos;s Edge
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
            type="contributions"
            total={654876}
            data={supportingCommittees}
          />
          <CommitteeCharts
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
      Election {
        ElectionCycle
      }
      Committee {
        Name
        TotalFunding
      }
      fields {
        slug
      }
    }
  }
`

export default MeasureDetails
