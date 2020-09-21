import React from "react"
import NavbarItem from "./navbarItem"

import styles from "./menu.module.scss"

const Menu = ({ links, menuIsOpen, submenu, windowIsLarge }) => (
  <ul
    className={`${styles.navigation} ${styles.closed} ${menuIsOpen &&
      styles.open} ${submenu && styles.submenu} ${menuIsOpen &&
      submenu &&
      styles.openSubmenu}`}
  >
    {(menuIsOpen || windowIsLarge) &&
      links.map((link, index) => {
        return (
          <NavbarItem
            key={index}
            menuIsOpen={menuIsOpen}
            windowIsLarge={windowIsLarge}
            {...link}
          />
        )
      })}
  </ul>
)

export default Menu
