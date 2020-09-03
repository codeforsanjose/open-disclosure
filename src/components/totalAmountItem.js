import React from "react"
import styles from "./totalAmountItem.module.scss"

const currencyFormatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

function formatDollars(value) {
  return currencyFormatter.format(value)
}

function title(type) {
  if (type === "expenditures") {
    return "Total spent"
  } else if (type === "balance") {
    return "Current balance"
  } else {
    return "Total raised"
  }
}

function detail(type) {
  let detail
  if (type === "expenditures") {
    detail = "Expenditures"
  } else if (type === "balance") {
    detail = "Cash on hand"
  } else {
    detail = "Contributions"
  }
  return " (" + detail + ")"
}

export default function TotalAmountItem({ total, type = "contributions" }) {
  return (
    <div className={styles.totalAmount}>
      <p className={styles.header}>
        <span className={styles.title}>{title(type)}</span>
        {detail(type)}
      </p>
      <p className={styles.value}>{formatDollars(total)}</p>
    </div>
  )
}

export function TotalAmountPanelItem({ total, type = "contributions" }) {
  return (
    <a href={`#${type}`} className={styles.panel}>
      <p className={styles.title}>{title(type)}</p>
      <p className={styles.header}>{detail(type)}</p>
      <p className={styles.value}>{formatDollars(total)}</p>
    </a>
  )
}
