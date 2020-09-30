import { Link } from "gatsby"
import React from "react"
import { formatDollars } from "../common/util/formatters"
import styles from "./candidateItem.module.scss"

const CandidateItem = item => (
  <Link className={styles.container} key={item.name} to={item.href}>
    <div className={styles.imageContainer}>
      <img alt="candidate" height="180px" width="180px" src={item.image} />
    </div>
    <div className={styles.candidateInfo}>
      <h4>{item.name}</h4>
      <p>{item.position}</p>
      <h3>{formatDollars(item.amount)}</h3>
      <p className={styles.amountRaised}>Amount raised</p>
    </div>
  </Link>
)

export default CandidateItem
