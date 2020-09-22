import TotalAmountItem, {
  TotalAmountPanelItem,
} from "../components/totalAmountItem"

import BarChart from "../components/barChart"
import Layout from "../components/layout"
import SideNav from "../components/sideNav"
import React from "react"
import SectionHeader from "../components/sectionHeader"
import { graphql, Link } from "gatsby"
import styles from "./candidate.module.scss"
import useWindowIsLarge from "../common/hooks/useWindowIsLarge"
import WebIcon from "../../static/images/web.png"
import VotersEdgeIcon from "../../static/images/votersEdge.png"
import TwitterIcon from "../../static/images/twitter.png"
import ArrowIcon from "../../static/images/arrow.png"
import NoData from "../components/noData"

// TODO Hook up charts to real data
const expenditures = [
  { label: "Fundraising", value: 25000 },
  { label: "Media", value: 18000 },
  { label: "Administrative", value: 14000 },
  { label: "Campaign salaries", value: 4000 },
]

const breakdowns = [
  { label: "Out of State", value: 65487 },
  { label: "Within California", value: 327438 },
  { label: "Within San José", value: 301242 },
]

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
    FundingByType,
    TotalRCPT,
    TotalEXPN,
    jsonNode,
  } = data.candidate
  const { seat, ballotDesignation, website, twitter } = jsonNode

  const hasData = !isNaN(TotalRCPT) && !isNaN(TotalEXPN)
  const totalFunding = TotalRCPT // TODO Should this include TotalLOAN?
  const balance = totalFunding - TotalEXPN

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
          {!hasData ? (
            <NoData page="candidate" />
          ) : (
            <>
              <section>
                <SectionHeader title="Fundraising totals" />
                <div className={styles.totals}>
                  <TotalAmountPanelItem
                    type="contributions"
                    total={totalFunding}
                  />
                  <TotalAmountPanelItem type="expenditures" total={TotalEXPN} />
                  <TotalAmountPanelItem type="balance" total={balance} />
                </div>
              </section>
              <ChartSection
                title="Where the money is coming from"
                type="contributions"
                id="contributions"
                total={totalFunding}
                data={[
                  { label: "Committee", value: FundingByType.COM },
                  { label: "Individual", value: FundingByType.IND },
                  { label: "Party?", value: FundingByType.PTY },
                  { label: "Other", value: FundingByType.OTH },
                ]}
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
                data={expenditures}
              />
              <ChartSection
                title="Breakdown by region"
                type="contributions"
                id="balance"
                total={totalFunding}
                data={breakdowns}
                showPercentages
              />
              {Committees && Committees.legnth > 0 ? (
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
      TotalEXPN
      TotalLOAN
      TotalRCPT
      FundingByType {
        COM
        IND
        PTY
        OTH
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
