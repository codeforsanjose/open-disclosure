import IframeResizer from "iframe-resizer-react"
import LandingPageHero from "../components/landingPageHero"
import Layout from "../components/layout"
import React from "react"
import * as styles from "./checkRegistration.module.scss"
import useWindowIsLarge from "../common/hooks/useWindowIsLarge"

export default function CheckRegistration() {
  const title = "Check if you’re registered"
  const subtitle =
    "It only takes 30 seconds to make sure you’re registered to vote."

  return (
    <Layout
      title={title}
      description={subtitle}
      windowIsLarge={useWindowIsLarge()}
    >
      <LandingPageHero title={title} subtitle={subtitle} />
      <div className={styles.body}>
        <IframeResizer
          log
          src="https://verify.vote.org/?partner=111111&campaign=free-tools"
          style={{ width: "1px", minWidth: "100%" }}
          frameBorder="0"
        />
      </div>
    </Layout>
  )
}
