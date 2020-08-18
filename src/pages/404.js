import React from "react"
import styles from "./404.module.scss"
import Layout from "../components/layout"
import LandingPageHero from "../components/landingPageHero"
import { Link } from "gatsby"

export default () => (
  <Layout>
    <header>
      <LandingPageHero title="404" subtitle="Page not found." />
    </header>
    <div className={styles.body}>
      <h1>Sorry, the page you're looking for doesn't exist.</h1>
      <p>
        <Link to="/" className={styles.link}>
          Click here
        </Link>{" "}
        to return to the homepage.
      </p>
    </div>
  </Layout>
)
