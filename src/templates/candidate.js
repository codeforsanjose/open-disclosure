import TotalAmountItem, {
  TotalAmountPanelItem,
} from "../components/totalAmountItem"

import BarChart from "../components/barChart"
import LandingPageHero from "../components/landingPageHero"
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

// TODO Hook up charts to real data
const contributions = [
  { label: "Individual", value: 500000 },
  { label: "Committee", value: 400000 },
  { label: "Self-funding", value: 14000 },
  { label: "Other", value: 8000 },
]

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
  const { Name: name, Elections: elections } = data.candidate
  // Let's assume that the first election in the list is the relevant (current) one
  // TODO We need an error state if there are no elections
  const { ElectionTitle: title } = elections[0]
  return (
    <Layout windowIsLarge={useWindowIsLarge()}>
      <LandingPageHero background="blue" title={name} subtitle={title} />
      <div className={styles.container}>
        <SideNav>
          <div className={styles.mainSection}>
            <section>
              <SectionHeader title={name} />
              <div className={styles.aboutSection}>
                <img
                  alt="Candidate profile photo"
                  className={styles.profilePhoto}
                  src="https://ww1.prweb.com/prfiles/2018/03/13/15302451/gI_87395_LindsayHeadshot_cision.png"
                />
                <div>
                  <p className={styles.aboutTitle}>
                    <span className={styles.currentPosition}>
                      Incumbent, District 9 Representative
                    </span>
                    {" - elected"}
                  </p>
                  <p className={styles.aboutText}>
                    This candidate has agreed to voluntary spending limits. The
                    maximum contribution this candidate can accept is $800 from
                    any individual, business entity, committee or other
                    organization and $1,600 from a qualified broad-based
                    committee.
                  </p>
                  <div className={styles.aboutLinks}>
                    <a href="/" className={styles.aboutLink}>
                      <img
                        alt="Web icon"
                        src={WebIcon}
                        className={styles.icon}
                      />
                      www.lindsaylohan2020.com
                    </a>
                    <a href="/" className={styles.aboutLink}>
                      <img
                        alt="External link icon"
                        src={VotersEdgeIcon}
                        className={styles.icon}
                      />
                      Voter's Edge Profile
                    </a>
                    <a href="/" className={styles.aboutLink}>
                      <img
                        alt="Twitter icon"
                        src={TwitterIcon}
                        className={styles.icon}
                      />
                      @lindsaylohan2020
                    </a>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <SectionHeader title="Fundraising totals" />
              <div className={styles.totals}>
                <TotalAmountPanelItem type="contributions" total={654876} />
                <TotalAmountPanelItem type="expenditures" total={383254} />
                <TotalAmountPanelItem type="balance" total={271622} />
              </div>
            </section>
            <ChartSection
              title="Where the money is coming from"
              type="contributions"
              id="contributions"
              total={654876}
              data={contributions}
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
              total={383254}
              data={expenditures}
            />
            <ChartSection
              title="Breakdown by region"
              type="contributions"
              id="balance"
              total={654876}
              data={breakdowns}
              showPercentages
            />
            <section>
              <SectionHeader title="Other committees controlled by candidate" />
              {elections[0].Committees.map(({ Name }) => (
                <Link className={styles.committeeLink}>{Name}</Link>
              ))}
            </section>
          </div>
        </SideNav>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    candidate(fields: { slug: { eq: $slug } }) {
      Name
      Elections {
        ElectionTitle
        Committees {
          Name
        }
      }
    }
  }
`
