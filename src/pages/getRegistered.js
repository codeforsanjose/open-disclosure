import LandingPageHero from "../components/landingPageHero"
import Layout from "../components/layout"
import React from "react"
import useWindowIsLarge from "../common/hooks/useWindowIsLarge"

export default function GetRegistered() {
  return (
    <Layout windowIsLarge={useWindowIsLarge(760)}>
      <LandingPageHero
        title="Get registered"
        subtitle="Get registered to vote in less than two minutes"
      />
      <h1>TODO</h1>
    </Layout>
  )
}
