import React from "react"
import buttonStyles from "./button.module.scss"
import "typeface-roboto"

const Button = ({ secondary, containerStyle = {}, textStyle, text }) => (
  <a
    className={`${buttonStyles.container} ${secondary &&
      buttonStyles.secondary}`}
    style={containerStyle}
    href='/'
  >
    <p className={buttonStyles.buttonText} style={textStyle}>
      {text}
    </p>
  </a>
)

export default Button
