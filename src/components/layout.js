// Libraries
import { Link } from "gatsby"
import React from "react"
// Styles
import styles from "./layout.module.scss"
// Components
import Navbar from "./navbar"
import Logo from "./logo"

const renderNavItems = items => (
  <ul>
    {items.map(({ name, endpoint, anchor = false }, index) => (
      <li key={`footer nav item ${name}`} className={styles.footerNavItem}>
        {anchor ? (
          <a href={endpoint}>{name}</a>
        ) : (
          <Link to={endpoint}>{name}</Link>
        )}
      </li>
    ))}
  </ul>
)

export default function Layout(props) {
  const links = [
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
      endpoint: "/measures",
    },
    {
      name: "About",
      endpoint: "/aboutUs",
    },
    {
      name: "FAQ",
      endpoint: "/faq",
    },
  ]

  const footerLinks = [
    {
      name: "Join Us",
      anchor: true,
      endpoint: "https://www.codeforsanjose.com/",
    },
    {
      name: "Find your ballot",
      endpoint: "/findYourBallot",
    },
    {
      name: "Open source",
      anchor: true,
      endpoint: "https://github.com/codeforsanjose/open-disclosure",
    },
    {
      name: "Register to vote",
      endpoint: "/registerToVote",
    },
  ]

  return (
    <div className={styles.container}>
      <Navbar links={links} windowIsLarge={props.windowIsLarge} />

      {props.children}

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerTop}>
            <div className={styles.footerLeft}>
              <Logo />
              <nav className={styles.footerNav}>
                {renderNavItems(links)}
                {renderNavItems(footerLinks)}
              </nav>
            </div>
            {/* <div className={styles.footerRight}>
                <h5>Updates delivered to your inbox</h5>
                <form onSubmit={handleSubmit}>
                  <input
                    aria-label="email"
                    className={styles.emailInput}
                    type="email"
                    placeholder="Enter your email address"
                    value={state.value}
                    onChange={handleChange}
                  />
                  <input
                    aria-label="subscribe"
                    className={styles.submitForm}
                    type="submit"
                    value="Subscribe"
                  />
                </form>
              </div> */}
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
              Ethics Commission Public Portal for Campaign Finance and Lobbyist
              Disclosure. Candidate and ballot measure information gathered from
              information provided to the Santa Clara County Registrar of Voters
              by the City of San José.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
