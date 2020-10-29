import React from "react"
import NavbarItem from "./navbarItem"

import styles from "./menu.module.scss"

const Menu = ({ links, menuIsOpen, windowIsLarge, closeMenu }) => {
  return (
    <ul
      className={`${styles.navigation} ${styles.closed} ${menuIsOpen &&
        styles.open}`}
    >
      {(menuIsOpen || windowIsLarge) &&
        links.map((link, index) => {
          return (
            <NavbarItem
              key={index}
              menuIsOpen={menuIsOpen}
              windowIsLarge={windowIsLarge}
              isLast={links.length === index + 1}
              closeMenu={closeMenu}
              {...link}
            />
          )
        })}
    </ul>
  )
}

export default Menu
