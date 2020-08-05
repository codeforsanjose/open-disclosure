import LandingPageHero from "../components/landingPageHero"
import Layout from "../components/layout"
import React from "react"
import styles from "./findYourBallot.module.scss"
import useWindowIsLarge from "../common/hooks/useWindowIsLarge"

export default function FindYourBallot() {
  return (
    <Layout windowIsLarge={useWindowIsLarge()}>
      <LandingPageHero
        title="Find your ballot"
        subtitle="Get the facts before you vote"
      />
      <div className={styles.body}>
        <h2>Get your personalized ballot</h2>
        <p>Get information on candidates, measures and who supports them</p>
        <div className={styles.iframe}>
          <p>TODO</p>
        </div>
      </div>
    </Layout>
  )
}
