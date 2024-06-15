import React from "react"
import Divider from "../common/divider"
import * as styles from "./sectionHeader.module.scss"

export default function SectionHeader({
  title,
  subtitle,
  isSubsection,
  isPageHeader,
}) {
  return (
    <div
      className={`${styles.container} ${isSubsection &&
        styles.subsection} ${isPageHeader && styles.pageHeader}`}
    >
      <h3>{title}</h3>
      <p>{subtitle}</p>
      {!isSubsection && <Divider/>}
    </div>
  )
}
