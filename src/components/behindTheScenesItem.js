import React from 'react'
import styles from './behindTheScenesItem.module.scss'
import Button from './button'

const BehindTheScenesItem = item => (
  <div className={styles.item}>
    <img height='315px' src={item.image} />
    <h3>{item.title}</h3>
    <p>{item.description1}</p>
    <p>{item.description2}</p>
    <div className={styles.footer}>
      <Button text={item.buttonText} />
    </div>
  </div>
)

export default BehindTheScenesItem