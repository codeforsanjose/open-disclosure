import React from "react"

import BarChart from "./barChart"
import SectionHeader from "./sectionHeader"
import TotalAmountItem from "./totalAmountItem"
import styles from "../templates/candidate.module.scss"

function ChartSection({
  id,
  title,
  type,
  total,
  data,
  isSubsection,
  ...passProps
}) {
  return (
    <section id={id} className={styles.section}>
      <SectionHeader title={title} isSubsection={isSubsection} />
      <TotalAmountItem type={type} total={total} />
      <BarChart type={type} total={total} rows={data} {...passProps} />
    </section>
  )
}

export default ChartSection
