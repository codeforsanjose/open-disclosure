import { graphql } from "gatsby"
import React from "react"

import { TotalAmountPanelItem } from "../components/totalAmountItem"
import Layout from "../components/layout"
import SideNav from "../components/sideNav"
import SectionHeader from "../components/sectionHeader"
import styles from "./referendum.module.scss"
import useWindowIsLarge from "../common/hooks/useWindowIsLarge"
import VotersEdgeIcon from "../images/votersEdge.webp"
import CommitteeCharts from "../components/committeeCharts"

function MeasureDetails({ data }) {
  const measure = data.referendum
  const { jsonNode } = measure
  return (
    <Layout
      title={measure.Name}
      description={`Finances supporting and opposing ${measure.Name}`}
      windowIsLarge={useWindowIsLarge()}
    >
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
            subtitle={measure.description}
          />
          <section>
            <div className={styles.aboutSection}>
              <p className={styles.aboutTitle}>
                <span className={styles.measurePurpose}>
                  What would this measure do?
                </span>
              </p>
              <p className={styles.aboutText}>{measure.ballotLanguage}</p>
              <div className={styles.aboutLinks}>
                <a href={jsonNode.href} className={styles.aboutLink}>
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
              <TotalAmountPanelItem
                type="measureSupport"
                total={measure.TotalSupport}
              />
              <TotalAmountPanelItem
                type="measureOppose"
                total={measure.TotalOppose}
              />
            </div>
          </section>
          {measure.Support != null ? (
            <CommitteeCharts
              id="measureSupport"
              type="contributions"
              total={measure.TotalSupport}
              data={measure.Support}
            />
          ) : null}
          {measure.Opposition != null ? (
            <CommitteeCharts
              id="measureOppose"
              type="expenditures"
              total={measure.TotalOppose}
              data={measure.Opposition}
            />
          ) : null}
        </div>
      </SideNav>
    </Layout>
  )
}

export const query = graphql`
  query($id: String) {
    referendum(ID: { eq: $id }) {
      id
      ID
      Name
      description
      ballotLanguage
      electionDate
      TotalSupport
      TotalOppose
      Support {
        TotalFunding
        TotalEXPN
        TotalLOAN
        TotalRCPT
        ExpenditureByType {
          SAL
          CMP
          CNS
          CVC
          FIL
          FND
          LIT
          MBR
          MTG
          OFC
          POL
          POS
          PRO
          PRT
          RAD
          RFD
          TEL
          TRS
          WEB
        }
        FundingByType {
          IND
          COM
          OTH
          PTY
          SCC
        }
        FundingByGeo {
          SJ
          NonSJ
          CA
          NonCA
        }
        Committees {
          Name
          TotalFunding
        }
        Contributors {
          Name
          ContributionType
          Occupation
          Employer
          ZipCode
          Contributions
          Date
        }
      }
      Opposition {
        TotalFunding
        TotalEXPN
        TotalLOAN
        TotalRCPT
        ExpenditureByType {
          SAL
          CMP
          CNS
          CVC
          FIL
          FND
          LIT
          MBR
          MTG
          OFC
          POL
          POS
          PRO
          PRT
          RAD
          RFD
          TEL
          TRS
          WEB
        }
        FundingByType {
          IND
          COM
          OTH
          PTY
          SCC
        }
        FundingByGeo {
          SJ
          NonSJ
          CA
          NonCA
        }
        Committees {
          Name
          TotalFunding
        }
        Contributors {
          Name
          ContributionType
          Occupation
          Employer
          ZipCode
          Contributions
          Date
        }
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
