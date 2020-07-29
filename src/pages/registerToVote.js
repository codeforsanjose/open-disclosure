import React from "react"
import Layout from "../components/layout"
import styles from "./registerToVote.module.scss"
import { useEffect, useState } from "react"
import orangeHeaderBlob from "./../../static/images/orangeHeaderBlob.png"
import Button from "../common/button/index"

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
          <div className={styles.heroLeft}>
            <h1>Register to Vote</h1>
            <h2>Register to vote or see if you're already registered.</h2>
          </div>
          <div className={styles.heroRight}>
            <img
              alt="header"
              className="responsive"
              width="708px"
              src={orangeHeaderBlob}
            />
          </div>
        </header>
        <div className={styles.body}>
          <div className={`${styles.card} ${styles.green}`}>
            <h2>Am I registered to vote?</h2>
            <p>
              Not sure if you're registered to vote? It takes 30 seconds to
              confirm!
            </p>
            <Button text="Check now" />
          </div>
          <div className={`${styles.card} ${styles.blue}`}>
            <h2>Register to vote!</h2>
            <p>
              Ready to make your voice heard in this upcoming election? Register
              to vote in less than two minutes.
            </p>
            <Button text="Register to vote" />
          </div>
        </div>
      </div>
    </Layout>
  )
}
