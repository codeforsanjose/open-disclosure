import React from "react"
import { Link } from "gatsby"
import Bar from "./bar"
import styles from "./candidatesListItem.module.scss"

const percentFormatter = Intl.NumberFormat("en-US", { style: "percent" })

function formatPercent(value) {
  return percentFormatter.format(value)
}

const currencyFormatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

function formatDollars(value) {
  return currencyFormatter.format(value)
}

export default ({
  Name,
  path,
  electionTotal,
  TotalContributions,
  jsonNode,
}) => {
  const percent = formatPercent(TotalContributions / electionTotal)
  return (
    <Link className={styles.container} to={path}>
      <img
        height="12.5rem"
        width="12.5rem"
        src="https://picsum.photos/125"
        alt={`Headshot of candidate ${Name}`}
      />
      <div className={styles.candidate}>
        <div className={styles.textInfo}>
          <div className={styles.candidateInfo}>
            <h1 className={styles.headerText}>{Name}</h1>
            <p className={styles.label}>{jsonNode.ballotDesignation}</p>
          </div>
          <div className={styles.totalRaised}>
            <p className={styles.label}>Total raised</p>
            <h2 className={styles.headerText}>
              {formatDollars(TotalContributions)}
            </h2>
          </div>
        </div>
        <div className={styles.visualization}>
          <Bar type="contributions" percent={percent} />
        </div>
      </div>
    </Link>
  )
}
