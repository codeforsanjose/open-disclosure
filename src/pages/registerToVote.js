import LandingPageHero from "../components/landingPageHero"
import Layout from "../components/layout"
import React from "react"
import RegisterToVoteCard from "../components/registerToVoteCard"
import styles from "./registerToVote.module.scss"
import useWindowIsLarge from "../common/hooks/useWindowIsLarge"

export default function RegisterToVote() {
  return (
    <Layout windowIsLarge={useWindowIsLarge(760)}>
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
