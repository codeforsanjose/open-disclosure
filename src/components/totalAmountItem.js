import React from "react"
import { formatDollars } from "../common/util/formatters"
import styles from "./totalAmountItem.module.scss"

function title(type) {
  switch (type) {
    case "expenditures":
      return "Total spent"
    case "balance":
      return "Current balance"
    case "measureSupport":
      return "Total Raised to Support"
    case "measureOppose":
      return "Total Raised to Oppose"
    default:
      return "Total raised"
  }
}

function detail(type) {
  let detail

  switch (type) {
    case "expenditures":
      detail = "Expenditures"
      break
    case "balance":
      detail = "Cash on hand"
      break
    case "measureSupport":
    case "measureOppose":
      break
    default:
      detail = "Contributions"
      break
  }

  return detail ? " (" + detail + ")" : ""
}

export function AmountItem({ total, title, type }) {
  return (
    <div className={styles.totalAmount}>
      <label className={styles.header}>
        <span className={styles.title}>{title}</span>
        {type}
      </label>
      <p className={styles.value}>{formatDollars(total)}</p>
    </div>
  )
}

export default function TotalAmountItem({ total, type = "contributions" }) {
  return (
    <div className={styles.totalAmount}>
      <label className={styles.header}>
        <span className={styles.title}>{title(type)}</span>
        {detail(type)}
      </label>
      <p className={styles.value}>{formatDollars(total)}</p>
    </div>
  )
}

export function TotalAmountPanelItem({ total, type = "contributions" }) {
  return (
    <a href={`#${type}`} className={styles.panel}>
      <label className={styles.title}>{title(type)}</label>
      <p className={styles.header}>{detail(type)}</p>
      <p className={styles.value}>{formatDollars(total)}</p>
    </a>
  )
}
