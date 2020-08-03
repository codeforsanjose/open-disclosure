import { useEffect, useState } from "react"

import LandingPageHero from "../components/landingPageHero"
import Layout from "../components/layout"
import React from "react"

export default function GetRegistered() {
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
        title="Get registered"
        subtitle="Get registered to vote in less than two minutes"
      />
      <h1>TODO</h1>
    </Layout>
  )
}
