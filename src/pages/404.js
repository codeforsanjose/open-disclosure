// Libraries
import React from "react"
// Styles
import * as styles from "./404.module.scss"
// Components
import { graphql, StaticQuery } from "gatsby"
import Layout from "../components/layout"
import useWindowIsLarge from "../common/hooks/useWindowIsLarge"
import pageNotFound from "../images/404.png"
import { Link } from "gatsby"

const handleClick = e => {
  if (e.key === "Enter") {
    window.history.back()
  }
}

export default function Component404(){
  return (
    <StaticQuery
      query={graphql`
        query {
          allElection {
            edges {
              node {
                Date
                OfficeElections {
                  slug
                }
                Referendums {
                  id
                  Name
                  Election {
                    ElectionCycle
                  }
                  slug
                }
              }
            }
          }
        }
      `}
      render={data => {
        const currentElection = data.allElection.edges[0].node
        const links = [
          {
            pageName: "Home",
            href: "/",
          },
          {
            pageName: "Find Your Ballot",
            href: "/findYourBallot",
          },
        ]
        if (currentElection.Referendums.length) {
          links.splice(1, 0, {
            pageName: "Measures",
            href: `/${currentElection.Date}/referendums/${currentElection.Referendums[0].slug}`,
          })
        }
        if (currentElection.OfficeElections) {
          links.splice(1, 0, {
            pageName: "Candidates",
            href: `/${currentElection.Date}/candidates/${currentElection.OfficeElections[0].Title}`,
          })
        }

        return (
          <Layout title="Page not found" windowIsLarge={useWindowIsLarge()}>
            <main className={styles.container}>
              <img
                height={"286.93px"}
                width={"271px"}
                src={pageNotFound}
                alt="A smiling person shrugging"
              />
              <div className={styles.text}>
                <h1>Sorry, we can&apos;t find that page...</h1>
                <p>
                  <span
                    onClick={handleClick}
                    onKeyDown={handleClick}
                    role="link"
                    tabIndex={0}
                  >
                    Head back
                  </span>{" "}
                  to the previous page or try one of these helpful links:
                </p>
                <ul>
                  {links.map(link => (
                    <li key={`404-link-${link.pageName}`}>
                      <Link to={link.href}>
                        <p className={styles.link}>{link.pageName}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </main>
          </Layout>
        )
      }}
    />
  )
}
