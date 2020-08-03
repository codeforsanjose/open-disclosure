import LandingPageHero from "../components/landingPageHero"
import Layout from "../components/layout"
import React from "react"
import useWindowIsLarge from "../common/hooks/useWindowIsLarge"

export default function CheckRegistration() {
  return (
    <Layout windowIsLarge={useWindowIsLarge(760)}>
      <LandingPageHero
        title="Check if you’re registered"
        subtitle="It only takes 30 seconds to make sure you’re registered to vote."
      />
      <h1>TODO</h1>
    </Layout>
  )
}
