import TotalAmountItem, {
  TotalAmountPanelItem,
} from "../components/totalAmountItem"

import BarChart from "../components/barChart"
import LandingPageHero from "../components/landingPageHero"
import Layout from "../components/layout"
import React from "react"
import SectionHeader from "../components/sectionHeader"
import { graphql } from "gatsby"
import styles from "./candidate.module.scss"
import useWindowIsLarge from "../common/hooks/useWindowIsLarge"

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

function ChartSection({ title, type, total, data, ...passProps }) {
  return (
    <section>
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
        <div className={styles.sideNav}></div>
        <div className={styles.mainSection}>
          <section>
            <SectionHeader title={name} />
            <div className={styles.aboutSection}>
              <p>TODO - candidate about section</p>
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
            total={654876}
            data={contributions}
          />
          <ChartSection
            title="How the money is being spent"
            type="expenditures"
            total={383254}
            data={expenditures}
          />
          <ChartSection
            title="Breakdown by region"
            type="contributions"
            total={654876}
            data={breakdowns}
            showPercentages
          />
        </div>
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
      }
    }
  }
`
