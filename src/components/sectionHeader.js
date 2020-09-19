import React from "react"
import styles from "./sectionHeader.module.scss"

export default function SectionHeader({ title, isSubsection }) {
  return (
    <div className={`${styles.container} ${isSubsection && styles.subsection}`}>
      <h3>{title}</h3>
      <div className={styles.divider} />
    </div>
  )
}
