import IframeResizer from "iframe-resizer-react"
import LandingPageHero from "../components/landingPageHero"
import Layout from "../components/layout"
import React from "react"
import styles from "./getRegistered.module.css"
import useWindowIsLarge from "../common/hooks/useWindowIsLarge"

export default function GetRegistered() {
  return (
    <Layout windowIsLarge={useWindowIsLarge()}>
      <LandingPageHero
        title="Get registered"
        subtitle="Get registered to vote in less than two minutes"
      />
      <div className={styles.body}>
        <IframeResizer
          log
          src="https://register.vote.org/?partner=111111&campaign=free-tools"
          style={{ width: "1px", minWidth: "100%" }}
          frameBorder="0"
        />
      </div>
    </Layout>
  )
}
