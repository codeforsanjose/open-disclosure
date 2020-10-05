import React from "react"
import BarChart from "./barChart"
import SectionHeader from "./sectionHeader"
import { ContributorCodes } from "../common/util/codes"

import styles from "./committeeCharts.module.scss"

export default function CommitteeCharts({ id, type, total, data }) {
  const { Committees, FundingByType, FundingByGeo } = data
  console.log(data)
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
        <BarChart
          isCommittee
          type={type}
          total={total}
          rows={Committees.map(({ Name, TotalContributions }) => ({
            label: Name,
            value: TotalContributions,
          }))}
        />
      </div>
      <div className={styles.margin}>
        <SectionHeader title="Total raised by type" isSubsection />
        <BarChart
          type={type}
          total={total}
          rows={Object.keys(FundingByType)
            .filter(key => FundingByType[key] != null)
            .map(key => ({
              ...ContributorCodes[key],
              value: FundingByType[key],
            }))
            .sort((a, b) => b.value - a.value)}
        />
      </div>
      <div className={styles.margin}>
        <SectionHeader title="Breakdown by region" isSubsection />
        <BarChart
          type={type}
          total={total}
          rows={[
            { label: "Within San José", value: FundingByGeo.SJ },
            {
              label: "Within California",
              value: FundingByGeo.CA - FundingByGeo.SJ,
            },
            { label: "Out of state", value: FundingByGeo.NonCA },
          ]}
        />
      </div>
    </section>
  )
}
