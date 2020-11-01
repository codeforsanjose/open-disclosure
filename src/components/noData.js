import React from "react"
import styles from "./noData.module.scss"
import noDataImg from "../images/noData.webp"

const text = {
  candidate: {
    h1: "No funds here.",
    p: "This candidate has not reported any funds.",
  },
  list: {
    h1: "Nothing to report here.",
    p: "We're tallying up the numbers.",
  },
}

export default function NoData({ page }) {
  return (
    <div className={styles.container}>
      <h1>{text[page].h1}</h1>
      <p>{text[page].p}</p>
      <p>
        {/* TODO: Add email notifications */}
        {/* <a>Get notified</a> about updates. */}
        Check back soon for updated information!
      </p>
      <img
        className={styles.noDataImg}
        height={163}
        width={159}
        src={noDataImg}
        alt="Receipt with a dollar sign on it"
      />
    </div>
  )
}
