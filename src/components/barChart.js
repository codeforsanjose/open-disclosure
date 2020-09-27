import {
  formatDollarsInThousands,
  formatPercent,
} from "../common/util/formatters"

import Bar from "./bar"
import React from "react"
import styles from "./barChart.module.scss"

function Row({
  label,
  value,
  tooltip,
  total,
  type,
  showPercentages,
  isCommittee,
}) {
  const percent = formatPercent(value / total)
  return (
    <div className={`${styles.row} ${isCommittee && styles.noLabel}`}>
      <div className={styles.rowTop}>
        <p className={styles.label} title={tooltip ?? label}>
          {label}
        </p>
        <p className={styles.value}>
          {showPercentages ? percent : formatDollarsInThousands(value)}
        </p>
      </div>
      <div className={styles.rowBottom}>
        <Bar percent={percent} type={type} />
      </div>
      {isCommittee && <div className={styles.padding} />}
    </div>
  )
}

/**
 * A component to render a bar chart breaking down a candidate or measure's
 * contributions or expenditures.
 */
export default function BarChart({
  type = "contributions", // "contributions" | "expenditures"
  total, // number
  rows, // Array<{label: string, value: number, tooltip?: string}>
  showPercentages = false, // Show percentages instead of dollar values
  isCommittee = false, // Removes label to the left of row, places it above
}) {
  return (
    <div className={styles.chart}>
      {rows.map(({ label, value, tooltip }) => (
        <>
          {isCommittee && <h4>***TO REMOVE: PLACEHOLDER COMMITTEE NAME***</h4>}
          <Row
            key={label}
            label={label}
            value={value}
            total={total}
            type={type}
            isCommittee={isCommittee}
            showPercentages={showPercentages}
            tooltip={tooltip}
          />
        </>
      ))}
    </div>
  )
}
