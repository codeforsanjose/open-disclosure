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
      <div className={styles.sectionBody}>{props.items.map(item => props.renderItems(item))}</div>
      {props.footer ? (<div className={styles.sectionFooter}><a href='/'>{props.footer()}</a></div>) : null}
      </div>
  </section>
)

export default MainPageSection