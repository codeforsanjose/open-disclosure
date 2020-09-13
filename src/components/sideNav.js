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

function formatMenuForCandidates(input) {
  const menu = {}
  offices.forEach(({ type, filter }) => {
    input.forEach(race => {
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

function formatMenuForMeasures(data) {
  return data.map(measure => ({ title: measure.Title }));
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
                Referendums {
                  Title
                  Description
                  Total_Contributions
                }
              }
            }
          }
        }
      `}
      render={data => {
        let navLinks = null;
        if (window.location.href.includes('referendum')) {
          const { Referendums } = (data.allElection?.edges?.[0]?.node) ?? [];
          const menu = formatMenuForMeasures(Referendums);

          navLinks = (
            <ul>
              <li className={styles.section}>
                <h4 className={styles.text}>Ballot Measures</h4>
                <ul>
                  {menu.map(measure => (
                    <li className={styles.election} key={measure.title}>
                      <Link to="#">
                        <p className={styles.text}>{measure.title}</p>
                      </Link>
                      <div className={styles.selected} />
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          )
        } else if (window.location.href.includes('candidate')) {
          const { Date, OfficeElections } = data.allElection.edges[0].node
          const menu = formatMenuForCandidates(OfficeElections);
          const sections = Object.keys(menu);

          navLinks = (
            <ul>
              {sections.map((section, index) => (
                <li key={`${section}-${index}`} className={styles.section}>
                  <h4 className={styles.text}>{section}</h4>
                  <ul>
                    {menu[section].map(race => (
                      <li className={styles.election}>
                        <Link
                          to={`/${Date}/candidates/${race.Title.toLowerCase()
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
          );
        }

        return (
          <div className={styles.container}>
            <nav className={styles.navbar}>{navLinks}</nav>
            <div className={styles.body}>{props.children}</div>
          </div>
        )
      }}
    />
  )
}
