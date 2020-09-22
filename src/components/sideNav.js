import React from "react"
import { StaticQuery, graphql, Link, navigate } from "gatsby"
import styles from "./sideNav.module.scss"
import { primaryBlack, primaryGreen } from "../styles/_exports.scss"
import Select from "react-select"
import SectionHeader from "./sectionHeader"
import LandingPageHero from "./landingPageHero"

const REFERENDUMS = "Ballot Measure"

const textStyles = {
  fontFamily: "Lato",
  fontWeight: "bold",
  fontSize: "1.4rem",
  color: primaryBlack,
}

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: "none",
    boxShadow: "none",
    ":hover": {
      filter: state.menuIsOpen
        ? "none"
        : "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    },
  }),
  valueContainer: provided => ({
    ...provided,
    padding: "1.3rem 8px",
  }),
  placeholder: () => textStyles,
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: primaryBlack,
    ":hover": {
      color: primaryBlack,
    },
  }),
  menu: provided => ({
    ...provided,
    boxShadow: "0px 4px 30px rgba(203, 201, 201, 0.25)",
    transition: "all 150ms linear",
  }),
  group: provided => ({
    ...provided,
    marginBottom: "2rem",
    ":last-child": {
      marginBottom: "0",
    },
  }),
  groupHeading: provided => ({
    ...provided,
    ...textStyles,
    textTransform: "none",
  }),
  option: provided => ({
    ...provided,
    ...textStyles,
    backgroundColor: "none",
    fontWeight: "normal",
    ":hover": {
      color: primaryGreen,
    },
  }),
  singleValue: provided => ({
    ...provided,
    ...textStyles,
    color: primaryGreen,
  }),
}

const offices = [
  { type: "City Wide Office", filter: "mayor" },
  { type: "City Wide Office", filter: "auditor" },
  { type: "City Council", filter: "representative" },
  { type: "City Council", filter: "council" },
  { type: "San José Unified School District", filter: "sjusd" },
]

function formatMenuForCandidates(candidateData) {
  const menu = []
  offices.forEach(({ type, filter }) => {
    const menuGroup = { label: type, options: [] }
    candidateData.forEach(race => {
      const title = race.Title.toLowerCase()
      if (title.includes(filter)) {
        menuGroup.options.push({ label: race.Title, value: race.fields.slug })
      }
    })
    if (menuGroup.options.length) {
      menu.push(menuGroup)
    }
  })

  return menu
}

function formatMenuForMeasures(measureData) {
  const menu = { label: REFERENDUMS, options: [] }
  measureData.forEach(measure => {
    menu.options.push({
      label: measure.Title,
      value: measure.fields.slug,
    })
  })
  return menu
}

const formatLink = label =>
  label.includes(REFERENDUMS) ? "referendums" : "candidates"

function onSelect({ label, value }, { action }, date) {
  if (action === "select-option") {
    navigate(`/${date}/${formatLink(label)}/${value}`)
  }
}

export default function sideNav({
  children,
  headerBackground,
  isCandidate = false,
  pageSubtitle,
  pageTitle,
}) {
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
                  Title
                  Description
                  TotalContributions
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
        const { Date, OfficeElections, Referendums } =
          data.allElection?.edges?.[0]?.node ?? []
        const measureMenu = formatMenuForMeasures(Referendums)
        const candidateMenu = formatMenuForCandidates(OfficeElections)
        const menuOptions = [...candidateMenu, measureMenu]
        let selectedTitle = window.location.href.split("/")
        selectedTitle = selectedTitle[selectedTitle.length - 1]
          .split("-")
          .map(word => word[0].toUpperCase() + word.slice(1))
          .join(" ")

        return (
          <div className={styles.outerContainer}>
            <LandingPageHero
              background={headerBackground}
              title={pageTitle}
              subtitle={pageSubtitle}
            />
            <div className={styles.innerContainer}>
              <nav className={styles.navbar}>
                {!isCandidate && (
                  <div className={styles.select}>
                    <Select
                      styles={customStyles}
                      placeholder={isCandidate ? pageSubtitle : selectedTitle}
                      options={menuOptions}
                      onChange={(val, act) => onSelect(val, act, Date)}
                    />
                  </div>
                )}
                <ul className={styles.sidebar}>
                  {menuOptions.map((section, index) => (
                    <li key={section.label} className={styles.section}>
                      <h4 className={styles.text}>{section.label}</h4>
                      <ul>
                        {section.options.map(race => {
                          const active =
                            race.label === selectedTitle ||
                            (isCandidate && race.label === pageSubtitle)
                          return (
                            <li
                              key={`${section.label}-${race.value}`}
                              className={`{${styles.election} ${active &&
                                styles.active}`}
                            >
                              <div className={styles.linkContainer}>
                                <Link
                                  to={`/${Date}/${formatLink(section.label)}/${
                                    race.value
                                  }`}
                                >
                                  <p className={styles.text}>{race.label}</p>
                                </Link>
                                <div className={styles.selected} />
                              </div>
                            </li>
                          )
                        })}
                      </ul>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className={styles.body}>{children}</div>
            </div>
          </div>
        )
      }}
    />
  )
}
