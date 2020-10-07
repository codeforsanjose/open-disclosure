import React, { useEffect, useState } from "react"
import styles from "./navbar.module.scss"
import Logo from "./logo"
import Menu from "./menu"
import HamburgerIcon from "../common/hamburgerIcon"

function disableScroll() {
  document.body.style.overflow = "hidden"
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
  window.onscroll = function() {
    window.scrollTo(scrollLeft, scrollTop)
  }
}

function enableScroll() {
  document.body.style.overflow = "visible"
  window.onscroll = function() {}
}

export default function Navbar(props) {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  useEffect(() => {
    menuIsOpen ? disableScroll() : enableScroll()
    // Return this function so it's called on unmount (just in case)
    return enableScroll
  }, [menuIsOpen])

  const links = [
    { name: "Home", endpoint: "/", hidden: true },
    ...props.links,
    {
      name: "Register to vote",
      endpoint: "/registerToVote",
      hidden: true,
      arrow: true,
    },
    { name: "Find your ballot", endpoint: "/findYourBallot", hidden: true },
  ]

  return (
    <div className={styles.outerContainer}>
      <nav
        className={styles.innerContainer}
        role="navigation"
        aria-label="Header Navigation"
      >
        <div className={styles.navbarTop}>
          <Logo header containerStyle={styles.logo} />
          <HamburgerIcon
            handleClick={() => {
              setMenuIsOpen(!menuIsOpen)
            }}
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
      </nav>
    </div>
  )
}
