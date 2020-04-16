import React from "react"
import { Link } from "gatsby"
import layoutStyles from "./layout.module.scss"
import "typeface-roboto"
import "typeface-bitter"

export default class Layout extends React.PureComponent {
  state = {
    value: "",
  }

  links = [
    {
      name: "Ballot Measures",
      endpoint: "/",
    },
    {
      name: "Candidates",
      endpoint: "/",
    },
    {
      name: "About",
      endpoint: "/",
    },
    {
      name: "FAQ",
      endpoint: "/",
    },
  ]

  footerLinks = [
    {
      name: "Join Us",
      endpoint: "/",
    },
    {
      name: "Find Your Ballot",
      endpoint: "/",
    },
    {
      name: "Open Source",
      endpoint: "/",
    },
    {
      name: "Press",
      endpoint: "/",
    },
  ]

  handleSubmit() {}

  handleChange = ({ target: { value } }) => {
    console.log(value)
    this.setState({ value })
  }

  renderLogo(truncate = true) {
    const { windowIsLarge } = this.props
    const logo = () => (
      <p>
        <strong>Open Disclosure</strong> San José
      </p>
    )

    return (
      <Link className={layoutStyles.headerText} to={"/"}>
        {windowIsLarge ? logo() : truncate ? <p>ODSJ</p> : logo()}
      </Link>
    )
  }

  render() {
    return (
      <div className={layoutStyles.container}>
        {this.props.hideHeader ? null : (
          <header className={layoutStyles.header}>
            {this.renderLogo()}
            <nav>
              <ul className={layoutStyles.headerNav}>
                {this.links.map((item, index) => (
                  <li
                    key={`header nav item ${index}`}
                    className={layoutStyles.headerNavItem}
                  >
                    <Link className={layoutStyles.link} to={item.endpoint}>
                      <strong className={layoutStyles.headerNavItemText}>
                        {item.name}
                      </strong>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </header>
        )}
        {this.props.children}
        <div className={layoutStyles.footer}>
          <div className={layoutStyles.footerTop}>
            <div className={layoutStyles.footerLeft}>
              {this.renderLogo(false)}
              <nav>
                <ul className={layoutStyles.footerNav}>
                  <div className={layoutStyles.footerNavSection}>
                    {this.links.map((item, index) => (
                      <li
                        key={`footer nav item ${index}`}
                        className={layoutStyles.footerNavItem}
                      >
                        <Link
                          className={`${layoutStyles.footerNavItemText} ${layoutStyles.link}`}
                          to={item.endpoint}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </div>
                  <div className={layoutStyles.footerNavSection}>
                    {this.footerLinks.map((item, index) => (
                      <li
                        key={`footer nav item ${index}`}
                        className={layoutStyles.footerNavItem}
                      >
                        <Link
                          className={`${layoutStyles.footerNavItemText} ${layoutStyles.link}`}
                          to={item.endpoint}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </div>
                </ul>
              </nav>
            </div>
            <div className={layoutStyles.footerRight}>
              <div className={layoutStyles.footerRightInner}>
                {/* To-Do: Replace with image */}
                <div className={layoutStyles.imgPlaceholder} />
                <h5>Updates delivered to your inbox</h5>
                <form onSubmit={this.handleSubmit}>
                  <input
                    className={layoutStyles.emailInput}
                    type="email"
                    placeholder="Enter your email address"
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                  <input
                    className={layoutStyles.submitForm}
                    type="submit"
                    value="Subscribe"
                  />
                </form>
              </div>
            </div>
          </div>
          <div className={layoutStyles.footerBottom}>
            <p>Brought to you by Code for San José</p>
            <p>
              Campaign finance data provided by the City of San José Public
              Ethics Commission Public Portal for Campaign Finance and Lobbyist
              Disclosure. Candidate and ballot measure information gathered from
              information provided to the Santa Clara County Registrar of Voters
              by the City of San José.
            </p>
          </div>
        </div>
      </div>
    )
  }
}
