import React from "react"
import styles from "./sectionHeader.module.scss"

export default function SectionHeader({ title }) {
  return (
    <>
      <h3>{title}</h3>
      <div className={styles.divider} />
    </>
  )
}
