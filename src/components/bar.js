import React from "react"
import styles from "./bar.module.scss"

export default function Bar({ percent, type }) {
  const colorStyle =
    type === "expenditures" ? styles.expenditures : styles.contributions
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
