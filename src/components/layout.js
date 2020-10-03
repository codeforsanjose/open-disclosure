// Libraries
import { StaticQuery, graphql, Link } from "gatsby"
import React from "react"
// Styles
import styles from "./layout.module.scss"
// Components
import Navbar from "./navbar"
import Logo from "./logo"

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

export default function Layout(props) {
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
                  id
                  Name
                  Election {
                    ElectionCycle
                  }
                  Committee {
                    Name
                    TotalFunding
                  }
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
            name: "Candidates",
            endpoint: `/${election.Date}/candidates/${election.OfficeElections[0].fields.slug}`,
            links: election.OfficeElections.map(office => ({
              position: office.Title,
              endpoint: `/${election.Date}/candidates/${office.fields.slug}`,
            })),
          },
          {
            name: "Measures",
            endpoint: `/${election.Date}/referendums/${election.Referendums[0].fields.slug}`,
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
                  <h1>
                    Special thanks to{" "}
                    <a href="https://www.opendisclosure.io/">
                      Open Oakland&apos;s Open Disclosure
                    </a>{" "}
                    for the inspiration.
                  </h1>
                  <p>
                    Brought to you by Open San José and San José&apos;s Public
                    Ethics Commission
                  </p>
                  <p>
                    Campaign finance data provided by the City of San José
                    Public Ethics Commission Public Portal for Campaign Finance
                    and Lobbyist Disclosure. Candidate and ballot measure
                    information gathered from information provided to the Santa
                    Clara County Registrar of Voters by the City of San José.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        )
      }}
    />
  )
}
