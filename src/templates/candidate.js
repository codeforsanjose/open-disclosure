import { ContributorCodes, ExpenditureCodes } from "../common/util/codes"
import { Link, graphql } from "gatsby"
import TotalAmountItem, {
  TotalAmountPanelItem,
} from "../components/totalAmountItem"

import ArrowIcon from "../../static/images/arrow.png"
import BarChart from "../components/barChart"
import Layout from "../components/layout"
import NoData from "../components/noData"
import React from "react"
import SectionHeader from "../components/sectionHeader"
import SideNav from "../components/sideNav"
import TwitterIcon from "../../static/images/twitter.png"
import VotersEdgeIcon from "../../static/images/votersEdge.png"
import WebIcon from "../../static/images/web.png"
import styles from "./candidate.module.scss"
import useWindowIsLarge from "../common/hooks/useWindowIsLarge"

function ChartSection({ id, title, type, total, data, ...passProps }) {
  return (
    <section id={id} className={styles.section}>
      <SectionHeader title={title} />
      <TotalAmountItem type={type} total={total} />
      <BarChart type={type} total={total} rows={data} {...passProps} />
    </section>
  )
}

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
  const { seat, ballotDesignation, website, twitter } = jsonNode

  const balance = TotalContributions - TotalEXPN
  const outOfStateFunding = TotalContributions - FundingByGeo.CA

  return (
    <Layout windowIsLarge={useWindowIsLarge()}>
      <SideNav
        candidate={true}
        headerBackground="blue"
        pageTitle={Name}
        pageSubtitle={seat}
      >
        <div className={styles.mainSection}>
          <section>
            <SectionHeader title={Name} />
            <div className={styles.aboutSection}>
              <img
                className={styles.profilePhoto}
                src="https://picsum.photos/125"
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
                <p className={styles.aboutText}>
                  This candidate has agreed to voluntary spending limits. The
                  maximum contribution this candidate can accept is $800 from
                  any individual, business entity, committee or other
                  organization and $1,600 from a qualified broad-based
                  committee.
                </p>
                <div className={styles.aboutLinks}>
                  <a href={"http://" + website} className={styles.aboutLink}>
                    <img alt="Web icon" src={WebIcon} className={styles.icon} />
                    {website}
                  </a>
                  <a href="/" className={styles.aboutLink}>
                    <img
                      alt="External link icon"
                      src={VotersEdgeIcon}
                      className={styles.icon}
                    />
                    Voter's Edge Profile
                  </a>
                  <a
                    href={"http://twitter.com/" + twitter}
                    className={styles.aboutLink}
                  >
                    <img
                      alt="Twitter icon"
                      src={TwitterIcon}
                      className={styles.icon}
                    />
                    {"@" + twitter}
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
              <ChartSection
                title="Where the money is coming from"
                type="contributions"
                id="contributions"
                total={TotalContributions}
                data={Object.keys(FundingByType)
                  .filter(key => FundingByType[key] != null)
                  .map(key => ({
                    label: ContributorCodes[key],
                    value: FundingByType[key],
                  }))
                  .sort((a, b) => b.value - a.value)}
              />
              <Link className={styles.seeAllLink} to="/">
                See all contributions
                <img
                  alt="Right arrow icon"
                  className={`${styles.icon} ${styles.seeAllIcon}`}
                  src={ArrowIcon}
                />
              </Link>
              <ChartSection
                title="How the money is being spent"
                type="expenditures"
                id="expenditures"
                total={TotalEXPN}
                data={Object.keys(ExpenditureByType)
                  .filter(key => ExpenditureByType[key] != null)
                  .map(key => ({
                    label: ExpenditureCodes[key],
                    value: ExpenditureByType[key],
                  }))
                  .sort((a, b) => b.value - a.value)
                  .slice(0, 4)}
              />
              <ChartSection
                title="Breakdown by region"
                type="contributions"
                id="balance"
                total={TotalContributions}
                data={[
                  { label: "Within California", value: FundingByGeo.CA },
                  { label: "Out of state", value: outOfStateFunding },
                ]}
                showPercentages
              />
              {Committees && Committees.length > 0 ? (
                <section>
                  <SectionHeader title="Other committees controlled by candidate" />
                  {data.candidate.Committees.map(({ Name }) => (
                    <Link className={styles.committeeLink}>{Name}</Link>
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
      }
      FundingByGeo {
        CA
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
        website
        twitter
      }
    }
  }
`
