import React from "react"
import styles from "./snapshotItem.module.scss"

const SnapshotItem = item => (
  <div className={styles.container} key={item.number}>
    <h2 className={styles.title}>{item.number}</h2>
    <p className={styles.description}>{item.description}</p>
  </div>
)

export default SnapshotItem
