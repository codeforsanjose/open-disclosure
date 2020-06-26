import React, { Component } from "react"
import styles from "./navbar.module.scss"
import Logo from "./logo"
import NavbarItem from "./navbarItem"
import Menu from "./menu"

class Navbar extends Component {
  state = { menuIsOpen: false }

  handleClick = () => {
    this.setState({ menuIsOpen: !this.state.menuIsOpen })
  }

  links = [
    { name: "Home", endpoint: "/", hidden: true },
    ...this.props.links,
    { name: "Register to vote", endpoint: "/", hidden: true, arrow: true },
    { name: "Find your ballot", endpoint: "/", hidden: true },
  ]

  render() {
    return (
      <nav className={styles.navbar}>
        <Logo header containerStyle={styles.logo} />
        <div className={styles.hamburgerShell} onClick={this.handleClick}>
          <div
            className={`${styles.top} ${this.state.menuIsOpen &&
              styles.rotate}`}
          />
          <div
            className={`${styles.bottom} ${this.state.menuIsOpen &&
              styles.rotateBack}`}
          />
        </div>
        <Menu menuIsOpen={this.state.menuIsOpen}>
          {this.links.map((item, index) => (
            <NavbarItem
              menuIsOpen={this.state.menuIsOpen}
              windowIsLarge={this.props.windowIsLarge}
              {...item}
            />
          ))}
        </Menu>
      </nav>
    )
  }
}

export default Navbar
