// Libraries
import { StaticQuery, graphql, Link } from "gatsby"
import React from "react"
// Styles
import styles from "./layout.module.scss"
// Components
import SEO from "./seo"
import Navbar from "./navbar"
import Logo from "./logo"
import cfsjLogo from "../images/cfsj-logo.png"

const renderNavItems = items => (
  <ul>
    {items.map(({ name, endpoint, anchor = false }) => (
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

export default function Layout({
  title,
  description,
  windowIsLarge,
  children,
}) {
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
    <StaticQuery
      query={graphql`
        query {
          allElection {
            edges {
              node {
                Date
                OfficeElections {
                  Title
                  TotalContributions
                  fields {
                    slug
                  }
                }
                Referendums {
                  Name
                  fields {
                    slug
                  }
                }
              }
            }
          }
        }
      `}
      render={data => {
        const election = data.allElection.edges[0].node
        const links = [
          {
            name: "About",
            endpoint: "/aboutUs",
          },
          {
            name: "FAQ",
            endpoint: "/faq",
          },
        ]

        if (election.Referendums) {
          links.unshift({
            name: "Measures",
            endpoint: `/${election.Date}/referendums/${election.Referendums[0].fields.slug}`,
          })
        }
        if (election.OfficeElections) {
          links.unshift({
            name: "Candidates",
            endpoint: `/${election.Date}/candidates/${election.OfficeElections[0].fields.slug}`,
          })
        }

        return (
          <div className={styles.container}>
            <SEO
              title={`Open Disclosure San José - ${title}`}
              description={description}
            />
            <Navbar links={links} windowIsLarge={windowIsLarge} />
            {children}
            <footer className={styles.footer} aria-label="Site Footer">
              <div className={styles.footerInner}>
                <div className={styles.footerTop}>
                  <div className={styles.footerLeft}>
                    <Logo />
                    <nav
                      className={styles.footerNav}
                      role="navigation"
                      aria-label="Footer Navigation"
                    >
                      {renderNavItems(links, election)}
                      {renderNavItems(footerLinks)}
                    </nav>
                  </div>
                  <div className={styles.footerRight}>
                    {/* <h5>Updates delivered to your inbox</h5>
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
                </form> */}
                  </div>
                </div>
                <div className={styles.footerBottom}>
                  <div className={styles.cfsjLogo}>
                    <a href="https://www.codeforsanjose.com/">
                      <img src={cfsjLogo} alt="Logo of Code for San José" />
                      <p>Brought to you by Code for San José</p>
                    </a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        )
      }}
    />
  )
}
