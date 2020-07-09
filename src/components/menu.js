import React, { Component } from "react"

import styles from "./menu.module.scss"

const Menu = ({ children, menuIsOpen, submenu, windowIsLarge }) => (
  <ul
    className={`${styles.navigation} ${styles.closed} ${menuIsOpen && styles.open} ${submenu &&
      styles.submenu} ${menuIsOpen && submenu && styles.openSubmenu}`
    }
  >
    {(menuIsOpen || windowIsLarge) && children}
  </ul>
);

export default Menu;
