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
      <div className={styles.sectionFooter}>
        {props.footer ? (<a href='/'>{props.footer()}</a>) : null}
      </div>
    </div>
  </section>
)

export default MainPageSection

  // < div className = { styles.sectionBody } > { props.renderItems() }</div >