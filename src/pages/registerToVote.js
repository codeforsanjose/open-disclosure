import React from "react"
import Layout from "../components/layout"
import styles from "./registerToVote.module.scss"
import { useEffect, useState } from "react"

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
        </header>
      </div>
    </Layout>
  )
}
