// Libraries
import React from "react"
// Styles
import styles from "./404.module.scss"
// Components
import { graphql, StaticQuery } from "gatsby"
import Layout from "../components/layout"
import useWindowIsLarge from "../common/hooks/useWindowIsLarge"
import pageNotFound from "../../static/images/404.png"
import { Link } from "gatsby"

const handleClick = () => window.history.back()

export default () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allElection {
            edges {
              node {
                Date
                OfficeElections {
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
        const currentElection = data.allElection.edges[0].node
        const links = [
          {
            pageName: "Home",
            href: "/",
          },
          {
            pageName: "Candidates",
            href: `/${currentElection.Date}/candidates/${currentElection.OfficeElections[0].fields.slug}`,
          },
          {
            pageName: "Measures",
            href: "/measures",
          },
          {
            pageName: "Find Your Ballot",
            href: "/findYourBallot",
          },
        ]

        return (
          <Layout windowIsLarge={useWindowIsLarge()}>
            <div className={styles.container}>
              <img
                height={"286.93px"}
                width={"271px"}
                src={pageNotFound}
                alt="A smiling person shrugging"
              />
              <div className={styles.text}>
                <h1>Sorry, we can't find that page...</h1>
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
                    <li>
                      <Link to={link.href}>
                        <p className={styles.link}>{link.pageName}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Layout>
        )
      }}
    />
  )
}
