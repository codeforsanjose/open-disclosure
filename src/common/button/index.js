import React from "react"
import styles from "./styles.module.scss"

const Button = ({ secondary, containerStyle = {}, textStyle, text }) => (
  <a
    className={`${styles.container} ${secondary &&
      styles.secondary}`}
    style={containerStyle}
    href='/'
  >
    <p className={styles.buttonText} style={textStyle}>
      {text}
    </p>
  </a>
)

export default Button
