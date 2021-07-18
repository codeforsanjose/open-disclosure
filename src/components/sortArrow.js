import React from "react"
import {
  TiArrowUnsorted,
  TiArrowSortedUp,
  TiArrowSortedDown,
} from "react-icons/ti"
import styles from "./sortArrow.module.scss"

function arrowSwitch(order) {
  if (order === "ascending") {
    return <TiArrowSortedUp />
  }

  if (order === "descending") {
    return <TiArrowSortedDown />
  }

  return <TiArrowUnsorted />
}

export default function sortArrow({ order }) {
  return <div className={styles.container}>{arrowSwitch(order)}</div>
}
