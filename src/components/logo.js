import React from "react"
import styles from "./logo.module.scss"

const Logo = ({header}) => (
  <a className={`${styles.logo} ${header && styles.header}`} href={"/"}>
    <strong>Open Disclosure</strong> San José
  </a>
)

export default Logo
