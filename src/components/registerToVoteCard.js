import Button from "../common/button/index"
import React from "react"
import * as styles from "./registerToVoteCard.module.scss"

export default function RegisterToVoteCard(props) {
  return (
    <div className={styles.container}>
      <div
        className={`${styles.card} ${
          props.color === "green" ? styles.green : styles.blue
        }`}
      >
        <h2>{props.title}</h2>
        <p>{props.body}</p>
        <Button text={props.cta} href={props.href} />
      </div>
    </div>
  )
}
