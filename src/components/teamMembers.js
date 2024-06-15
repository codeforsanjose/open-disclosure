import React from "react"
import * as styles from "./teamMembers.module.scss"
import Blank from "../images/blankProfile.png"

const PersonalInfo = ({ position, name, image }) => (
  <>
    <img src={image || Blank} alt={`Headshot of ${name}`} />
    <h1>{name}</h1>
    <p>{position}</p>
  </>
)

export default function TeamMembers({ team }) {
  return (
    <ul className={styles.container}>
      {team.map(teammate => (
        <li
          className={styles.individual}
          key={`${teammate.position}-${teammate.name}`}
        >
          {teammate.github ? (
            <a href={`https://github.com/${teammate.github}`}>
              <PersonalInfo {...teammate} />
            </a>
          ) : (
            <PersonalInfo {...teammate} />
          )}
        </li>
      ))}
    </ul>
  )
}
