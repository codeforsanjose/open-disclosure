import React from 'react'
import styles from './navbar.module.scss'
import Logo from './logo'

const Navbar = (props) => (
  <nav className={styles.navbar}>
    <Logo />
    <ul className={styles.navigation}>
      {props.links.map((item, index) => (
        <li className={styles.item} key={`header nav item ${index}`}>
          <a className={styles.link} href={item.endpoint}>
            {item.name}
          </a>
          <div className={styles.selected} />
        </li>
      ))}
    </ul>
  </nav>
)

export default Navbar