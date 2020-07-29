import React from "react"
import Layout from "../components/layout"
import styles from "./registerToVote.module.scss"
import { useEffect, useState } from "react"
import Button from "../common/button/index"
import LandingPageHero from "../components/landingPageHero"
import RegisterToVoteCard from "../components/registerToVoteCard"

export default function RegisterToVote() {
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
            title="Register to Vote"
            subtitle="Register to vote or see if you're already registered."
          />
        </header>
        <div className={styles.body}>
          <RegisterToVoteCard
            color="green"
            title="Am I registered to vote?"
            body="Not sure if you're registered to vote? It takes 30 seconds to confirm!"
            cta="Check now"
          />
          <RegisterToVoteCard
            color="blue"
            title="Register to vote!"
            body="Ready to make your voice heard in this upcoming election? Register
              to vote in less than two minutes."
            cta="Register to vote"
          />
        </div>
      </div>
    </Layout>
  )
}
