import React from "react"
import {
  // Link,
  graphql,
} from "gatsby"
// Components
import Layout from "../components/layout"
import SideNav from "../components/sideNav"
import SectionHeader from "../components/sectionHeader"
import ChartSection from "../components/chartSection"
import { TotalAmountPanelItem } from "../components/totalAmountItem"
import NoData from "../components/noData"
// Styles
import styles from "./candidate.module.scss"
// Utilities
import { ContributorCodes, ExpenditureCodes } from "../common/util/codes"
import useWindowIsLarge from "../common/hooks/useWindowIsLarge"
// Assets
// import ArrowIcon from "../images/arrow.png"
import VotersEdgeIcon from "../images/votersEdge.png"
import WebIcon from "../images/web.png"
import BlankProfile from "../images/blankProfile.png"

export default function Candidate({ data }) {
  const {
    Name,
    Committees,
    ExpenditureByType,
    FundingByGeo,
    FundingByType,
    TotalContributions,
    TotalEXPN,
    jsonNode,
  } = data.candidate
  const {
    seat,
    ballotDesignation,
    website,
    profilePhoto,
  } = jsonNode

  const balance = TotalContributions - TotalEXPN
  const outOfStateFunding = TotalContributions - FundingByGeo.CA

  return (
    <Layout
      title={Name}
      description={`Profile of ${Name} running for ${seat}`}
      windowIsLarge={useWindowIsLarge()}
    >
      <SideNav
        isCandidate
        headerBackground="blue"
        pageTitle={Name}
        pageSubtitle={seat}
        selectedTitle={seat}
      >
        <div className={styles.container}>
          <section>
            <SectionHeader isPageHeader title={Name} />
            <div className={styles.aboutSection}>
              <img
                height={"12.5rem"}
                width={"12.5rem"}
                className={styles.profilePhoto}
                src={profilePhoto ? `/images/${profilePhoto}` : BlankProfile}
                alt={`Headshot of candidate ${Name}`}
              />
              <div>
                <p className={styles.aboutTitle}>
                  <span className={styles.ballotDesignation}>
                    {ballotDesignation}
                  </span>
                  {/* TODO - add this back when we have some way of knowing if the candidate is an incumbent? */}
                  {/* {" - elected"} */}
                </p>
                <div className={styles.aboutLinks}>
                  <a href={"http://" + website} className={styles.aboutLink}>
                    <img alt="Web icon" src={WebIcon} className={styles.icon} />
                    {website}
                  </a>
                  <a href={`http://ballotpedia.org/${Name.replace(" ", "_")}`} className={styles.aboutLink}>
                    <img
                      alt="External link icon"
                      src={VotersEdgeIcon}
                      className={styles.icon}
                    />
                    Ballotpedia
                  </a>
                </div>
              </div>
            </div>
          </section>
          {TotalContributions == null ? (
            <NoData page="candidate" />
          ) : (
            <>
              <section>
                <SectionHeader title="Fundraising totals" />
                <div className={styles.totals}>
                  <TotalAmountPanelItem
                    type="contributions"
                    total={TotalContributions}
                  />
                  <TotalAmountPanelItem type="expenditures" total={TotalEXPN} />
                  <TotalAmountPanelItem type="balance" total={balance} />
                </div>
              </section>
              <section>
                <ChartSection
                  title="Where the money is coming from"
                  type="contributions"
                  id="contributions"
                  total={TotalContributions}
                  data={Object.keys(FundingByType)
                    .filter(key => FundingByType[key] != null)
                    .map(key => ({
                      ...ContributorCodes[key],
                      value: FundingByType[key],
                    }))
                    .sort((a, b) => b.value - a.value)}
                />
                {/* <Link className={styles.seeAllLink} to="/">
                  See all contributions
                  <div>
                    <img
                      alt="Right arrow icon"
                      className={`${styles.icon} ${styles.seeAllIcon}`}
                      src={ArrowIcon}
                    />
                  </div>
                </Link> */}
              </section>
              <section>
                <ChartSection
                  title="How the money is being spent"
                  type="expenditures"
                  id="expenditures"
                  total={TotalEXPN}
                  data={Object.keys(ExpenditureByType)
                    .filter(key => ExpenditureByType[key] != null)
                    .map(key => ({
                      ...ExpenditureCodes[key],
                      value: ExpenditureByType[key],
                    }))
                    .sort((a, b) => b.value - a.value)}
                />
              </section>
              <section>
                <SectionHeader title="Independent Expenditures"/>
                <p className={styles.sectiontext}>
                Not sure how independent expenditures differ from direct campaign donations? Visit the independent expenditures page to learn more!
                </p>
                <div id="pieChart" className={styles.piechart}>
                  <div className={styles.graphlabel}>
                  Support: ${(FundingByType["IndependentSupport"]||0).toLocaleString("en-US")}
                  </div>
                  <div className={styles.graphlabel}>
                  Oppose: ${(FundingByType["IndependentOppose"]||0).toLocaleString("en-US")}
                  </div>
                  <div className={styles.graphlabel}>
                  Total: ${(FundingByType["IndependentSupport"]+FundingByType["IndependentOppose"]).toLocaleString('en-US')}
                  </div>
                </div>
              </section>
              <section>
                <ChartSection
                  title="Breakdown by region"
                  type="contributions"
                  id="balance"
                  total={TotalContributions}
                  data={[
                    { label: "Within San José", value: FundingByGeo.SJ },
                    {
                      label: "Within California",
                      value: FundingByGeo.CA - FundingByGeo.SJ,
                    },
                    { label: "Out of state", value: outOfStateFunding },
                  ]}
                  showPercentages
                />
                {/**<TableauViz candidateName={Name} candidateSeat={seat} />**/}
              </section>

              {Committees && Committees.length > 0 ? (
                <section className={styles.committees}>
                  <SectionHeader title="Committees supporting this candidate" />
                  {data.candidate.Committees.map(({ Name }, index) => (
                    <p
                      key={`candidate-committee-${index}`}
                      className={styles.committeeLink}
                    >
                      {Name}
                    </p>
                  ))}
                </section>
              ) : null}
            </>
          )}
        </div>
      </SideNav>
    </Layout>
  )
}

export const query = graphql`
  query($id: String) {
    candidate(ID: { eq: $id }) {
      Name
      TotalContributions
      TotalEXPN
      FundingByType {
        COM
        IND
        PTY
        OTH
        IndependentSupport
        IndependentOppose
      }
      FundingByGeo {
        CA
        SJ
      }
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
      Committees {
        Name
        TotalFunding
      }
      jsonNode {
        name
        seat
        ballotDesignation
        profilePhoto
        website
        twitter
        votersEdge
      }
    }
  }
`
