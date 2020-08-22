import React from "react"
import styles from "./candidateItem.module.scss"

const CandidateItem = item => (
  <div className={styles.container} key={item.name}>
    <img alt="candidate" height="180px" width="180px" src={item.image} />
    <div className={styles.candidateInfo}>
      <h4>{item.name}</h4>
      <p>{item.position}</p>
      <h3>{item.amount}</h3>
      <p className={styles.amountRaised}>Amount raised</p>
    </div>
  </div>
)

export default CandidateItem
