import React from "react"
import * as styles from "./bar.module.scss"
import { formatPercent } from "../common/util/formatters"

export default function Bar({ ratio, type }) {
  const colorStyle =
    type === "expenditures" ? styles.expenditures : styles.contributions
  const percent = formatPercent(ratio > 0 ? Math.max(ratio, 0.005) : 0)
  return (
    <div className={styles.barContainer}>
      <div className={styles.barBackground}>
        <div
          className={`${styles.bar} ${colorStyle}`}
          style={{ width: percent }}
        />
      </div>
    </div>
  )
}
