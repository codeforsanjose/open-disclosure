import React from "react"

import BarChart from "./barChart"
import SectionHeader from "./sectionHeader"
import TotalAmountItem from "./totalAmountItem"

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
    <div id={id}>
      <SectionHeader title={title} isSubsection={isSubsection} />
      <TotalAmountItem type={type} total={total} />
      <BarChart type={type} total={total} rows={data} {...passProps} />
    </div>
  )
}

export default ChartSection
