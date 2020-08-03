import { useEffect, useState } from "react"

import LandingPageHero from "../components/landingPageHero"
import Layout from "../components/layout"
import React from "react"

export default function CheckRegistration() {
  const [windowIsLarge, setWindowIsLarge] = useState(true)
  const updateWindowDimensions = () => {
    setWindowIsLarge(window.innerWidth >= 760)
  }
  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions)
    return () => {
      window.removeEventListener("resize", updateWindowDimensions)
    }
  }, [])
  return (
    <Layout windowIsLarge={windowIsLarge}>
      <LandingPageHero
        title="Check if you’re registered"
        subtitle="It only takes 30 seconds to make sure you’re registered to vote."
      />
      <h1>TODO</h1>
    </Layout>
  )
}
