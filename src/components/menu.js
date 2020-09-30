import React from "react"
import NavbarItem from "./navbarItem"

import styles from "./menu.module.scss"

const Menu = ({ links, menuIsOpen, submenu, windowIsLarge }) => {
  const navItems = () =>
    links.map((link, index) => {
      return (
        <NavbarItem
          key={index}
          menuIsOpen={menuIsOpen}
          windowIsLarge={windowIsLarge}
          {...link}
        />
      )
    })

  return (
    <ul
      className={`${styles.navigation} ${styles.closed} ${menuIsOpen &&
        styles.open} ${submenu && styles.submenu} ${menuIsOpen &&
        submenu &&
        styles.openSubmenu}`}
    >
      {(menuIsOpen || windowIsLarge) && navItems()}
    </ul>
  )
}

export default Menu
