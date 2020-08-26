// Libraries
import { Link } from "gatsby"
import React from "react"
// Styles
import styles from "./layout.module.scss"
// Components
import Navbar from "./navbar"
import Logo from "./logo"

export default class Layout extends React.PureComponent {
  state = {
    value: "",
  }

  links = [
    {
      name: "Candidates",
      endpoint: "/candidates",
      links: [
        {
          position: "Mayor",
          endpoint: "/",
        },
        {
          position: "City Auditor",
          endpoint: "/",
        },
        {
          position: "City Council",
          endpoint: "/",
        },
      ],
    },
    {
      name: "Measures",
      endpoint: "/",
    },
    {
      name: "About",
      endpoint: "/",
    },
    {
      name: "FAQ",
      endpoint: "/faq",
    },
  ]

  footerLinks = [
    {
      name: "Join Us",
      endpoint: "/",
    },
    {
      name: "Find your ballot",
      endpoint: "/findYourBallot",
    },
    {
      name: "Open source",
      endpoint: "/",
    },
    {
      name: "Press",
      endpoint: "/",
    },
  ]

  handleSubmit() {}

  handleChange = ({ target: { value } }) => {
    this.setState({ value })
  }

  renderNavItems = items => (
    <ul>
      {items.map((item, index) => (
        <li
          key={`footer nav item ${item.name}`}
          className={styles.footerNavItem}
        >
          <Link to={item.endpoint}>{item.name}</Link>
        </li>
      ))}
    </ul>
  )

  render() {
    return (
      <div className={styles.container}>
        <Navbar links={this.links} windowIsLarge={this.props.windowIsLarge} />

        {this.props.children}

        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <div className={styles.footerTop}>
              <div className={styles.footerLeft}>
                <Logo />
                <nav className={styles.footerNav}>
                  {this.renderNavItems(this.links)}
                  {this.renderNavItems(this.footerLinks)}
                </nav>
              </div>
              <div className={styles.footerRight}>
                <h5>Updates delivered to your inbox</h5>
                <form onSubmit={this.handleSubmit}>
                  <input
                    aria-label="email"
                    className={styles.emailInput}
                    type="email"
                    placeholder="Enter your email address"
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                  <input
                    aria-label="subscribe"
                    className={styles.submitForm}
                    type="submit"
                    value="Subscribe"
                  />
                </form>
              </div>
            </div>
            <div className={styles.footerBottom}>
              <h1>
                Special thanks to{" "}
                <a href="https://www.opendisclosure.io/">
                  Open Oakland's Open Disclosure
                </a>{" "}
                for the inspiration.
              </h1>
              <p>
                Brought to you by Open San José and San José's Public Ethics
                Commission
              </p>
              <p>
                Campaign finance data provided by the City of San José Public
                Ethics Commission Public Portal for Campaign Finance and
                Lobbyist Disclosure. Candidate and ballot measure information
                gathered from information provided to the Santa Clara County
                Registrar of Voters by the City of San José.
              </p>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}
