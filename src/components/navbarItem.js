import React, { useState, useEffect } from "react"
import styles from "./navbarItem.module.scss"
import linkArrow from "../../static/images/linkArrow.png"
import Menu from "./menu.js"
import { Link } from "gatsby"

export default function NavbarItem(props) {
  const [menuItemIsOpen, setMenuItemIsOpen] = useState(false);
  const [hasLinks, setHasLinks] = useState(false);

  useEffect(() => {
    const { links } = props
    setHasLinks(links && links.length);
  });

  const Anchor = children => {
    if (hasLinks && !props.windowIsLarge) {
      return (
        <div
          className={`${styles.link} ${styles.fullWidth} ${menuItemIsOpen &&
            styles.bold}`}
        >
          {children}
        </div>
      )
    }

    return (
      <Link
        className={`${styles.link} ${styles.fullWidth} ${hasLinks &&
          styles.disabled} ${hasLinks && menuItemIsOpen && styles.bold}`}
        to={props.endpoint}
      >
        {children}
      </Link>
    )
  }

  const toggleMenu = () => {
    hasLinks && setMenuItemIsOpen(!menuItemIsOpen)
  }

  return (
    <li
      className={`${styles.item} ${props.hidden && styles.hidden} ${props.menuIsOpen && styles.open} ${props.submenu &&
        styles.submenu}`}
      key={`link item ${props.name}`}
      onClick={toggleMenu}
      onKeyUp={toggleMenu}
      role="presentation"
    >
      <Anchor>
        <div className={`${styles.linkInner}`}>
          <span>{props.name || props.position}</span>
          <div className={styles.selected} />
        </div>
        {hasLinks || props.arrow ? (
          <img
            alt="link-arrow"
            src={linkArrow}
            height="9.2px"
            width="15.5px"
            className={`${styles.arrow} ${menuItemIsOpen &&
              styles.openMenuItem}`}
          />
        ) : null}
      </Anchor>
      {hasLinks && !props.windowIsLarge ? (
        <Menu
          menuIsOpen={menuItemIsOpen}
          submenu
          windowIsLarge={props.windowIsLarge}
          links={props.links}
        />
      ) : null}
    </li>
  )
}
