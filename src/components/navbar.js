import React, { Component } from "react"
import styles from "./navbar.module.scss"
import Logo from "./logo"
import NavbarItem from "./navbarItem"
import Menu from "./menu"
import HamburgerIcon from "../common/hamburgerIcon"

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
        <HamburgerIcon
          handleClick={this.handleClick}
          menuIsOpen={this.state.menuIsOpen}
        />
        <Menu menuIsOpen={this.state.menuIsOpen} windowIsLarge={this.props.windowIsLarge}>
          {this.links.map((item, index) => (
            <NavbarItem
              key={index}
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
