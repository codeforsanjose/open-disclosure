import React from "react"
import BarChart from "./barChart"
import SectionHeader from "./sectionHeader"
import styles from "./committeeCharts.module.scss"

export default function CommitteeCharts({ type, total, data }) {
  const typeText = {
    thirdPerson: "",
    gerund: "",
  }

  switch (type) {
    case "contributions":
      typeText.thirdPerson = "supports"
      typeText.gerund = "Supporting"
      break
    case "expenditures":
      typeText.thirdPerson = "opposes"
      typeText.gerund = "Opposing"
      break
    default:
      break
  }

  return (
    <section id={id}>
      <div className={styles.margin}>
        <SectionHeader title={`Who ${typeText.thirdPerson} this measure?`} />
        <SectionHeader title={`${typeText.gerund} Committee(s)`} isSubsection />
        <BarChart isCommittee type={type} total={total} rows={data} />
      </div>
      <div className={styles.margin}>
        <SectionHeader title="Total raised by type" isSubsection />
        <BarChart type={type} total={total} rows={data} />
      </div>
      <div className={styles.margin}>
        <SectionHeader title="Breakdown by region" isSubsection />
        <BarChart type={type} total={total} rows={data} />
      </div>
    </section>
  )
}
