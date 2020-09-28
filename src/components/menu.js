import React from "react"
import NavbarItem from "./navbarItem"

import styles from "./menu.module.scss"

const Menu = ({ links, menuIsOpen, submenu, windowIsLarge }) => (
  <ul
    className={`${styles.navigation} ${styles.closed} ${menuIsOpen &&
      styles.open} ${submenu && styles.submenu} ${menuIsOpen &&
      submenu &&
      styles.openSubmenu}`}
    style={{
      submenu: {
        maxHeight: (links.length - 1) * 4.3 + "rem",
      },
    }}
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
