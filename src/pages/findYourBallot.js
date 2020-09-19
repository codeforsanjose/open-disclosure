import IframeResizer from "iframe-resizer-react"
import LandingPageHero from "../components/landingPageHero"
import Layout from "../components/layout"
import React from "react"
import styles from "./findYourBallot.module.scss"
import useWindowIsLarge from "../common/hooks/useWindowIsLarge"

export default function FindYourBallot() {
  return (
    <Layout windowIsLarge={useWindowIsLarge()}>
      <header>
        <LandingPageHero
          background="blue"
          title="Find your ballot"
          subtitle="Get the facts before you vote"
        />
      </header>
      <div className={styles.container}>
        <h1>Get your personalized ballot</h1>
        <p>Get information on candidates, measures and who supports them</p>
        <div className={styles.iframe}>
          <IframeResizer
            log
            src="https://votersedge.org/en/ca/address-widget"
            minWidth="240px"
            height="239px"
            width="100%"
            frameBorder="0"
          />
        </div>
      </div>
    </Layout>
  )
}
