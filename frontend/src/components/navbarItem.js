import React from "react"
import styles from "./navbarItem.module.scss"
import { Link } from "gatsby"

export default function NavbarItem(props) {
  return (
    <li
      key={`navbar-item-${props.name}`}
      onBlur={() => props.isLast && props.closeMenu()}
      className={`${styles.item} ${props.hidden && styles.hidden}`}
    >
      <Link
        className={`${styles.link} ${styles.fullWidth}`}
        to={props.endpoint}
      >
        <div className={`${styles.linkInner}`}>
          <span>{props.name || props.position}</span>
          <div className={styles.selected} />
        </div>
      </Link>
    </li>
  )
}
