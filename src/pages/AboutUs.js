// Libraries
import React from "react"
import { useEffect, useState } from "react"
// Styles
import styles from "./aboutUs.module.scss"
import Layout from "../components/layout"
// Components
import LandingPageHero from "../components/landingPageHero"

export default function About_Us() {
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
        <div className={styles.container}>
          <header className={styles.hero}>
            <LandingPageHero
              title="About Us"
              subtitle="On a mission to promote local government accountability"
              />
          </header>
        </div>
        <div className={styles.wrapper}>
          <h1>About Open Disclosure San José</h1>
// not sure why but body text styles from aboutUs.module.scss won't load
          <h3>Open Disclosure was created to support transparency and integrity in local elections. We reveal the source of candidates’ funds to expose possible influence. We also show the source of money to support and oppose ballot measures. We publish campaign finance data in a way that is clear and accessible to give power to Oakland residents, strengthen local democracy, and build trust in our electoral system.</h3>
          <h1>About the data</h1>
          <h3>Open Disclosure was created to support transparency and integrity in local elections. We reveal the source of candidates’ funds to expose possible influence. We also show the source of money to support and oppose ballot measures. We publish campaign finance data in a way that is clear and accessible to give power to Oakland residents, strengthen local democracy, and build trust in our electoral system.</h3>
          <h2>Current team:</h2>
          <h2>Alumni:</h2>
          <h2>Special thanks</h2>
          <h3>Special thank you to our fellow Code for America brigade teams</h3>
        </div>
      </Layout>


    )
	}

              
