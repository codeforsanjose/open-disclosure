import { Link } from "gatsby"
import React from "react"
import { formatDollars } from "../common/util/formatters"
import styles from "./candidateItem.module.scss"

const CandidateItem = item => (
  <Link className={styles.container} key={item.name} to={item.href}>
    <div className={styles.imageContainer}>
      <img alt="candidate" height="180px" width="180px" src={item.image} 
      className={styles.profilePhoto}/>
    </div>
    <div className={styles.candidateInfo}>
      <h3>{item.name}</h3>
      <p>{item.position}</p>
      <div className={styles.money}>
        <div>
          <h4>{formatDollars(item.amount)}</h4>
          <p>Raised by</p>
          <p>candidate</p>
        </div>
        <div>
        <h4>{formatDollars(item.supportingIndependentExpenditures)}</h4>
        <p>Supporting</p>
        <p>Independent</p>
        <p>Expenditures</p>
        </div>
      </div>
    </div>
  </Link>
)

export default CandidateItem
