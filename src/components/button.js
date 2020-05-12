import React from "react"
import buttonStyles from "./button.module.scss"
import "typeface-roboto"

const Button = props => (
  <div className={buttonStyles.container} onClick={props.onClick}>
    <p className={buttonStyles.buttonText} style={props.textStyle}>
      {props.text}
    </p>
  </div>
)

export default Button
