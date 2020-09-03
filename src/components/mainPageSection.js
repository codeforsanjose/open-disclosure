import React from "react"
import styles from "./mainPageSection.module.scss"

const MainPageSection = props => (
  <section
    className={`${styles.outerContainer} ${props.secondary &&
      styles.secondary} ${props.offWhite && styles.offWhite}`}
  >
    <div
      className={`${styles.innerContainer} ${props.carousel &&
        styles.removeHorizontalPadding}`}
    >
      <div
        className={`${styles.sectionHeader} ${props.carousel &&
          styles.addHeaderPadding}`}
      >
        <h2>{props.title}</h2>
        <p>{props.description}</p>
      </div>
      <div
        className={`${styles.sectionBody} ${props.carousel &&
          styles.hideOverflow}`}
      >
        {props.children || props.items.map(item => props.renderItem(item))}
      </div>
      {props.footer ? (
        <div className={styles.sectionFooter}>{props.footer()}</div>
      ) : null}
    </div>
  </section>
)

export default MainPageSection
