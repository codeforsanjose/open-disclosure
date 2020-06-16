import React from 'react'
import styles from './candidateItem.module.scss'

const CandidateItem = item => (
  <div className={styles.item}>
    <img height='180px' width='180px' className={styles.title} src={item.image} />
    <div>
      <h4>{item.name}</h4>
      <p>{item.position}</p>
      <h3>{item.amount}</h3>
      <p className={styles.amountRaised}>
        Amount raised
      </p>
    </div>
  </div>
)

  export default CandidateItem