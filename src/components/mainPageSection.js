import React from "react"
import styles from "./mainPageSection.module.scss"

const MainPageSection = props => (
  <section
    className={`${styles.outerContainer} ${props.secondary &&
      styles.secondary} ${props.offWhite && styles.offWhite}`}
  >
    <div className={styles.innerContainer}>
      <div className={styles.sectionHeader}>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
      </div>
      <div className={styles.sectionBody}>{props.renderItems()}</div>
      <div className={styles.sectionFooter}></div>
    </div>
  </section>
)

export default MainPageSection
