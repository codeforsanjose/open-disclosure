import IframeResizer from "iframe-resizer-react"
import LandingPageHero from "../components/landingPageHero"
import Layout from "../components/layout"
import React from "react"
import styles from "./getRegistered.module.scss"
import useWindowIsLarge from "../common/hooks/useWindowIsLarge"

export default function GetRegistered() {
  const title = "Get registered"
  const subtitle = "Get registered to vote in less than two minutes"

  return (
    <Layout
      title={title}
      description={subtitle}
      windowIsLarge={useWindowIsLarge()}
    >
      <header>
        <LandingPageHero title={title} subtitle={subtitle} />
      </header>
      <main className={styles.body}>
        <IframeResizer
          log
          src="https://register.vote.org/?partner=111111&campaign=free-tools"
          style={{ width: "1px", minWidth: "100%" }}
          frameBorder="0"
        />
      </main>
    </Layout>
  )
}
