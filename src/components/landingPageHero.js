import React from "react"
import styles from "./landingPageHero.module.scss"

export default function LandingPageHero(props) {
  return (
    <div className={styles.hero}>
      <div className={styles.text}>
        <h1>{props.title}</h1>
        <h2>{props.subtitle}</h2>
      </div>
    </div>
  )
}
