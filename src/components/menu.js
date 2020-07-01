import React, { Component } from "react"
import styles from "./menu.module.scss"

export default class Menu extends Component {
  render() {
    return (
      <ul
        className={`${styles.navigation} ${styles.closed} ${this.props
          .menuIsOpen && styles.open} ${this.props.submenu &&
          styles.submenu} ${this.props.menuIsOpen &&
          this.props.submenu &&
          styles.openSubmenu}`}
      >
        {this.props.children}
      </ul>
    )
  }
}
