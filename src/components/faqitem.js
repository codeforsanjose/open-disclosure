import React, { Component } from "react"
import styles from "./faqItem.module.scss"

class FAQItem extends Component {
  state = {
    isOpen: false,
    degrees: 0,
  }

  handleClick = () => {
    const { isOpen, degrees } = this.state
    this.setState({ isOpen: !isOpen, degrees: degrees + 90 })
  }

  render() {
    const { isOpen, degrees } = this.state

    return (
      <div className={styles.container}>
        <div className={styles.itemTop}>
          <h3>{this.props.question}</h3>
          <div className={styles.icon} onClick={this.handleClick}>
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
          <p>{this.props.answer}</p>
        </div>
      </div>
    )
  }
}

export default FAQItem
