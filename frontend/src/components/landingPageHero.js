import React from "react"
import styles from "./landingPageHero.module.scss"

export default function LandingPageHero({
  title,
  subtitle,
  background = "orange",
}) {
  return (
    <div className={`${styles.hero} ${styles[background]}`}>
      <div className={styles.text}>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </div>
    </div>
  )
}
