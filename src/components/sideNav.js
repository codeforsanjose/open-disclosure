import React from "react"
import { StaticQuery, graphql } from "gatsby"
import styles from "./sideNav.module.scss"

export default function sideNav(props) {
  return (
    <StaticQuery
      query={graphql`
        query {
          allElection {
            edges {
              node {
                OfficeElections {
                  Title
                  TotalContributions
                }
              }
            }
          }
        }
      `}
      render={data => {
        console.log(data)
        return (
          <div className={styles.container}>
            <nav className={styles.navBar}>
              {data.allElection.edges[0].node.OfficeElections.map(
                (menuItem, index) => (
                  <div
                    key={`${menuItem.title}-${index}`}
                    className={styles.listItem}
                  >
                    <h4 className={styles.sectionTitle}>{menuItem.Title}</h4>
                  </div>
                )
              )}
            </nav>
            <div className={styles.body}>{props.children}</div>
          </div>
        )
      }}
    />
  )
}
