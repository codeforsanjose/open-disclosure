import React from "react"
import { StaticQuery, graphql, Link, navigate } from "gatsby"
import styles from "./sideNav.module.scss"
import { primaryBlack, primaryGreen } from "../styles/_exports.scss"
import Select from "react-select"
import SectionHeader from "./sectionHeader"
import LandingPageHero from "./landingPageHero"

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

function formatMenuForCandidates(input) {
  const menu = {}
  const menuOptions = []
  offices.forEach(({ type, filter }) => {
    const menuGroup = { label: type, options: [] }
    input.forEach(race => {
      const title = race.Title.toLowerCase()
      if (title.includes(filter)) {
        if (menu[type]) {
          menu[type].push(race)
        } else {
          menu[type] = [race]
        }
        menuGroup.options.push({ label: race.Title, value: race.fields.slug })
      }
    })
    if (menuGroup.options.length) {
      menuOptions.push(menuGroup)
    }
  })

  return [menu, menuOptions]
}

function formatMenuForMeasures(data) {
  return data.map(measure => ({ title: measure.Title }))
}

function onSelect({ value }, { action }, date) {
  if (action === "select-option") {
    navigate(`/${date}/candidates/${value}`)
  }
}

export default function sideNav({
  candidate,
  children,
  headerBackground,
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
                  Total_Contributions
                }
              }
            }
          }
        }
      `}
      render={data => {
        // let navLinks = null;
        // if (window.location.href.includes('referendum')) {
        //   const { Referendums } = (data.allElection?.edges?.[0]?.node) ?? [];
        //   const menu = formatMenuForMeasures(Referendums);

        //   navLinks = (
        //     <ul>
        //       <li className={styles.section}>
        //         <h4 className={styles.text}>Ballot Measures</h4>
        //         <ul>
        //           {menu.map(measure => (
        //             <li className={styles.election} key={measure.title}>
        //               <Link to="#">
        //                 <p className={styles.text}>{measure.title}</p>
        //               </Link>
        //               <div className={styles.selected} />
        //             </li>
        //           ))}
        //         </ul>
        //       </li>
        //     </ul>
        //   )
        // } else if (window.location.href.includes('candidate')) {
        //   const { Date, OfficeElections } = data.allElection.edges[0].node
        //   const menu = formatMenuForCandidates(OfficeElections);
        //   const sections = Object.keys(menu);

        //   navLinks = (
        //     <ul>
        //       {sections.map((section, index) => (
        //         <li key={`${section}-${index}`} className={styles.section}>
        //           <h4 className={styles.text}>{section}</h4>
        //           <ul>
        //             {menu[section].map(race => (
        //               <li className={styles.election}>
        //                 <Link
        //                   to={`/${Date}/candidates/${race.Title.toLowerCase()
        //                     .split(" ")
        //                     .join("-")}`}
        //                 >
        //                   <p className={styles.text}>{race.Title}</p>
        //                 </Link>
        //                 <div className={styles.selected} />
        //               </li>
        //             ))}
        //           </ul>
        //         </li>
        //       ))}
        //     </ul>
        //   );
        // }

        // return (
        //   <div className={styles.container}>
        //     <nav className={styles.navbar}>{navLinks}</nav>
        //     <div className={styles.body}>{props.children}</div>
        const { Date, OfficeElections } = data.allElection.edges[0].node
        const [menu, menuOptions] = formatMenu(OfficeElections)
        const sections = Object.keys(menu)
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
                <div className={styles.select}>
                  <Select
                    styles={customStyles}
                    placeholder={candidate ? pageSubtitle : selectedTitle}
                    options={menuOptions}
                    onChange={(val, act) => onSelect(val, act, Date)}
                  />
                </div>
                <ul className={styles.sidebar}>
                  {sections.map((section, index) => (
                    <li key={section} className={styles.section}>
                      <h4 className={styles.text}>{section}</h4>
                      <ul>
                        {menu[section].map(({ Title, fields: { slug } }) => {
                          const active =
                            Title === selectedTitle ||
                            (candidate && Title === pageSubtitle)
                          return (
                            <li
                              key={`${section}-${slug}`}
                              className={`{${styles.election} ${active &&
                                styles.active}`}
                            >
                              <div className={styles.linkContainer}>
                                <Link to={`/${Date}/candidates/${slug}`}>
                                  <p className={styles.text}>{Title}</p>
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
              <div className={styles.body}>
                <SectionHeader title={selectedTitle} />
                {children}
              </div>
            </div>
          </div>
        )
      }}
    />
  )
}
