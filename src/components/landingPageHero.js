import React from "react"
import styles from "./landingPageHero.module.scss"
import orangeHeaderBlob from "./../../static/images/orangeHeaderBlob.png"

export default function LandingPageHero(props) {
  return (
    <div className={styles.hero}>
      <div className={styles.heroLeft}>
        <h1>{props.title}</h1>
        <h2>{props.subtitle}</h2>
      </div>
    </div>
  )
}
