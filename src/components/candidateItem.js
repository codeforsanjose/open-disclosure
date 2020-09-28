import { Link } from "gatsby"
import React from "react"
import { formatDollars } from "../common/util/formatters"
import styles from "./candidateItem.module.scss"

const CandidateItem = item => (
  <div className={styles.container} key={item.name}>
    <img alt="candidate" height="180px" width="180px" src={item.image} />
    <Link to={item.href}>
      <div className={styles.candidateInfo}>
        <h4>{item.name}</h4>
        <p>{item.position}</p>
        <h3>{formatDollars(item.amount)}</h3>
        <p className={styles.amountRaised}>Amount raised</p>
      </div>
    </Link>
  </div>
)

export default CandidateItem
