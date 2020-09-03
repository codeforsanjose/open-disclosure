import React from "react"

import Button from "../common/button"
import styles from "./behindTheScenesItem.module.scss"

const BehindTheScenesItem = item => (
  <div className={styles.container} key={item.title}>
    <img alt="behind the scenes" height="315px" src={item.image} />
    <h3>{item.title}</h3>
    <p className={styles.description}>{item.description}</p>
    <div className={styles.footer}>
      <Button secondary text={item.buttonText} href={item.href} />
    </div>
  </div>
)

export default BehindTheScenesItem
