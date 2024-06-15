import React from "react"
import * as styles from "./logo.module.scss"

const Logo = ({ header, containerStyle }) => (
  <div className={containerStyle}>
    <a className={`${styles.logo} ${header && styles.header}`} href={"/"}>
      <strong>Open Disclosure</strong> San José
    </a>
  </div>
)

export default Logo
