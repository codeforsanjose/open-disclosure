import TotalAmountItem, {
  TotalAmountPanelItem,
} from "../components/totalAmountItem"

import BarChart from "../components/barChart"
import React from "react"
import SectionHeader from "../components/sectionHeader"
import styles from "./candidate.module.scss"

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

// TODO (#56) Create actual layout for this page
export default function Candidate() {
  return (
    <div className={styles.container}>
      <SectionHeader title="Fundraising totals" />
      <div className={styles.totals}>
        <TotalAmountPanelItem type="contributions" total={654876} />
        <TotalAmountPanelItem type="expenditures" total={383254} />
        <TotalAmountPanelItem type="balance" total={271622} />
      </div>
      <SectionHeader title="Where the money is coming from" />
      <TotalAmountItem type="contributions" total={654876} />
      <BarChart type="contributions" total={654876} rows={contributions} />
      <SectionHeader title="How the money is being spent" />
      <TotalAmountItem type="expenditures" total={383254} />
      <BarChart type="expenditures" total={383254} rows={expenditures} />
      <SectionHeader title="Breakdown by region" />
      <TotalAmountItem type="contributions" total={654876} />
      <BarChart
        type="contributions"
        total={654876}
        rows={breakdowns}
        showPercentages
      />
    </div>
  )
}
