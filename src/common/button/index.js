import { Link } from "gatsby"
import React from "react"
import styles from "./styles.module.scss"

const Button = ({
  secondary,
  containerStyle = {},
  textStyle,
  text,
  href = "/",
}) => (
  <Link
    to={href}
    className={`${styles.container} ${secondary && styles.secondary}`}
    style={containerStyle}
  >
    <p className={styles.buttonText} style={textStyle}>
      {text}
    </p>
  </Link>
)

export default Button
