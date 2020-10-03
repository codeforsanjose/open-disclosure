// Libraries
import React from "react"
// Styles
import styles from "./aboutUs.module.scss"
import Layout from "../components/layout"
// Components
import LandingPageHero from "../components/landingPageHero"
import useWindowIsLarge from "../common/hooks/useWindowIsLarge"

export default function AboutUs() {
  const title = "About Us"
  const subtitle = "On a mission to promote local government accountability"

  return (
    <Layout
      title={title}
      description={subtitle}
      windowIsLarge={useWindowIsLarge()}
    >
      <header>
        <LandingPageHero background="green" title={title} subtitle={subtitle} />
      </header>
      <div className={styles.container}>
        <h1>About Open Disclosure San José</h1>
        <p>
          Open Disclosure was created to support transparency and integrity in
          local elections. We reveal the source of candidates’ funds to expose
          possible influence. We also show the source of money to support and
          oppose ballot measures. We publish campaign finance data in a way that
          is clear and accessible to give power to Oakland residents, strengthen
          local democracy, and build trust in our electoral system.
        </p>
        <h1>About the data</h1>
        <p>
          Open Disclosure was created to support transparency and integrity in
          local elections. We reveal the source of candidates’ funds to expose
          possible influence. We also show the source of money to support and
          oppose ballot measures. We publish campaign finance data in a way that
          is clear and accessible to give power to Oakland residents, strengthen
          local democracy, and build trust in our electoral system.
        </p>
        <h2>Current team:</h2>
        <h2>Alumni:</h2>
        <h2>Special thanks</h2>
        <p>
          Special thanks to{" "}
          <a href="https://www.opendisclosure.io/">
            Open Oakland&apos;s Open Disclosure
          </a>{" "}
          for the inspiration behind our project.
        </p>
      </div>
    </Layout>
  )
}
