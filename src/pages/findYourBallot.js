import IframeResizer from "iframe-resizer-react"
import LandingPageHero from "../components/landingPageHero"
import Layout from "../components/layout"
import React from "react"
import * as styles from "./findYourBallot.module.scss"
import useWindowIsLarge from "../common/hooks/useWindowIsLarge"

export default function FindYourBallot() {
  const title = "Find your ballot"
  const subtitle = "Get the facts before you vote"

  return (
    <Layout
      title={title}
      description={subtitle}
      windowIsLarge={useWindowIsLarge()}
    >
      <header>
        <LandingPageHero background="blue" title={title} subtitle={subtitle} />
      </header>
      <main className={styles.outerContainer}>
        <div className={styles.innerContainer}>
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
      </main>
    </Layout>
  )
}
