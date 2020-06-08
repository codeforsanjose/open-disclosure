import React from 'react'
import styles from './snapshotItem.module.scss'

const SnapshotItem = item => (
    <div className={styles.item}>
      <h2 className={styles.title}>{item.number}</h2>
      <p className={styles.description}>{item.description1}</p>
      <p className={styles.description}>{item.description2}</p>
    </div>
)

export default SnapshotItem