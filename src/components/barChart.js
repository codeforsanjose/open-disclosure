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
  return (
    <div className={`${styles.row} ${isCommittee && styles.noLabel}`}>
      <div className={styles.rowTop}>
        <label className={styles.label} title={tooltip ?? label}>
          {label}
        </label>
        <p className={styles.value}>
          {showPercentages
            ? formatPercent(value / total)
            : formatDollarsInThousands(value)}
        </p>
      </div>
      <div className={styles.rowBottom}>
        <Bar ratio={value / total} type={type} />
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
      {rows.map(({ label, value, tooltip }, index) => (
        <div key={`${type}-${label}-barchart-${index}`}>
          {isCommittee && <h4>{label}</h4>}
          <Row
            key={label}
            label={!isCommittee ? label : ""}
            value={value}
            total={total}
            type={type}
            isCommittee={isCommittee}
            showPercentages={showPercentages}
            tooltip={tooltip}
          />
        </div>
      ))}
    </div>
  )
}
