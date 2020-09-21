import React, { useState } from "react"
import styles from "./navbar.module.scss"
import Logo from "./logo"
import Menu from "./menu"
import HamburgerIcon from "../common/hamburgerIcon"

function disableScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
  window.onscroll = function() {
    window.scrollTo(scrollLeft, scrollTop)
  }
}

function enableScroll() {
  window.onscroll = function() {}
}

const handleClick = (menuIsOpen, setMenuIsOpen) => {
  setMenuIsOpen(!menuIsOpen)
  if (menuIsOpen) {
    enableScroll()
    document.body.style.overflow = "visible"
  } else {
    disableScroll()
    document.body.style.overflow = "hidden"
  }
}

export default function Navbar(props) {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const links = [
    { name: "Home", endpoint: "/", hidden: true },
    ...props.links,
    {
      name: "Register to vote",
      endpoint: "/registerToVote",
      hidden: true,
      arrow: true,
    },
    { name: "Find your ballot", endpoint: "/", hidden: true },
  ]

  if (menuIsOpen && props.windowIsLarge) {
    handleClick(true, setMenuIsOpen)
  }

  return (
    <nav className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.navbarTop}>
          <Logo header containerStyle={styles.logo} />
          <HamburgerIcon
            handleClick={() => handleClick(menuIsOpen, setMenuIsOpen)}
            menuIsOpen={menuIsOpen}
          />
        </div>
        <div className={styles.navbarBottom}>
          <Menu
            menuIsOpen={menuIsOpen}
            windowIsLarge={props.windowIsLarge}
            links={links}
          />
        </div>
      </div>
    </nav>
  )
}
