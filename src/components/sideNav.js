import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import styles from "./sideNav.module.scss"

const offices = [
  { type: "City Wide Office", filter: "mayor" },
  { type: "City Wide Office", filter: "auditor" },
  { type: "City Council", filter: "representative" },
  { type: "City Council", filter: "council" },
  { type: "San José Unified School District", filter: "sjusd" },
]

function formatMenu(input) {
  const menu = {}
  offices.forEach(({ type, filter }) => {
    ;[
      { Title: "Mayor" },
      { Title: "City Auditor" },
      { Title: "District 3 Representative" },
      ...input,
      { Title: "SJUSD District 2" },
      { Title: "SJUSD District 4" },
      { Title: "SJUSD District 8" },
    ].forEach(race => {
      const title = race.Title.toLowerCase()
      if (title.includes(filter)) {
        if (menu[type]) {
          menu[type].push(race)
        } else {
          menu[type] = [race]
        }
      }
    })
  })

  return menu
}

export default function sideNav(props) {
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
                }
              }
            }
          }
        }
      `}
      render={data => {
        const { Date, OfficeElections } = data.allElection.edges[0].node
        const menu = formatMenu(OfficeElections)
        const sections = Object.keys(menu)
        return (
          <div className={styles.container}>
            <nav className={styles.navbar}>
              <ul>
                {sections.map((section, index) => (
                  <li key={`${section}-${index}`} className={styles.section}>
                    <h4 className={styles.text}>{section}</h4>
                    <ul>
                      {menu[section].map(race => (
                        <li className={styles.election}>
                          <Link
                            to={`/candidates/${Date}/${race.Title.toLowerCase()
                              .split(" ")
                              .join("-")}`}
                          >
                            <p className={styles.text}>{race.Title}</p>
                          </Link>
                          <div className={styles.selected} />
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </nav>
            <div className={styles.body}>{props.children}</div>
          </div>
        )
      }}
    />
  )
}
