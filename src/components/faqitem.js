import React, { useState } from "react"
import styles from "./faqItem.module.scss"

export default function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false)
  const [degrees, setDegrees] = useState(0)

  const handleClick = () => {
    setIsOpen(!isOpen)
    setDegrees(degrees + 90)
  }

  return (
    <div className={styles.container}>
      <div className={styles.itemTop}>
        <h3>{question}</h3>
        <div
          className={styles.icon}
          onClick={handleClick}
          onKeyDown={event => {
            if (event.keyCode === 13) {
              handleClick()
            }
          }}
          role="button"
          tabIndex={0}
        >
          <div
            className={`${styles.horizontalBar}`}
            style={{
              transform: `rotate(${degrees + "deg"})`,
              "-webkit-transform": `rotate(${degrees + "deg"})`,
            }}
          />
          <div className={styles.verticalBar} />
        </div>
      </div>
      <div className={`${styles.itemBottom} ${isOpen && styles.open}`}>
        {typeof answer === "function" ? answer() : <p>{answer}</p>}
      </div>
    </div>
  )
}
