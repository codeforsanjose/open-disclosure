import React from 'react'
import styles from './behindTheScenesItem.module.scss'
import Button from './button'

const BehindTheScenesItem = item => (
  <div className={styles.item}>
    <img className={styles.title} src={item.image} />
    <p className={styles.description}>{item.description1}</p>
    <p className={styles.description}>{item.description2}</p>
    <Button text={item.buttonText} />
  </div>
)

export default BehindTheScenesItem