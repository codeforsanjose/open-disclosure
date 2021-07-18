/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState, useRef } from "react"
import Layout from "../components/layout"
import styles from "./contributions.module.scss"
import useWindowIsLarge from "../common/hooks/useWindowIsLarge"
import LandingPageHero from "../components/landingPageHero"
import { formatDollars } from "../common/util/formatters"
import SortArrow from "../components/sortArrow"

const CONTRIBUTOR_DATA = {
  ID: "abc123",
  committeeName: "Friends of the Scions of the Seventh Dawn",
  totalContributions: 123456,
  contributors: [
    {
      contributorName: "Thancred Waters",
      contributorType: "Individual",
      occupation: "Gunbreaker",
      employer: "Scions of the Seventh Dawn",
      zipCode: 126456,
      contributionAmount: 1235,
      contributionDate: "1/23/45",
    },
    {
      contributorName: "Y'shtola Rhul",
      contributorType: "Individual",
      occupation: "Black Mage",
      employer: "Scions of the Seventh Dawn",
      zipCode: 122456,
      contributionAmount: 1232,
      contributionDate: "1/23/45",
    },
    {
      contributorName: "East Aldinard Trading Company",
      contributorType: "Organization",
      occupation: "",
      employer: "",
      zipCode: 123456,
      contributionAmount: 1274,
      contributionDate: "1/23/45",
    },
    {
      contributorName: "Order of the Twin Adder",
      contributorType: "Organization",
      occupation: "",
      employer: "",
      zipCode: 121456,
      contributionAmount: 2234,
      contributionDate: "1/23/45",
    },
    {
      contributorName: "Alphinaud Leveilleur",
      contributorType: "Individual",
      occupation: "Sage",
      employer: "Scions of the Seventh Dawn",
      zipCode: 126456,
      contributionAmount: 1334,
      contributionDate: "1/23/45",
    },
    {
      contributorName: "Alisaie Leveilleur",
      contributorType: "Individual",
      occupation: "Red Mage",
      employer: "Scions of the Seventh Dawn",
      zipCode: 128456,
      contributionAmount: 1239,
      contributionDate: "1/23/45",
    },
    {
      contributorName: "Thalocrassy of Limsa Lominsa",
      contributorType: "Organization",
      occupation: "",
      employer: "",
      zipCode: 129456,
      contributionAmount: 1834,
      contributionDate: "1/23/45",
    },
  ],
}

export default function Contributions() {
  const windowIsLarge = useWindowIsLarge()
  const [contributionData, setContributionData] = useState(
    CONTRIBUTOR_DATA.contributors
  )
  const [sortBy, setSortBy] = useState("contributionAmount")
  const prevSort = useRef(sortBy)
  const [order, setOrder] = useState(false)
  const prevOrder = useRef(order)
  const [contribFilter, setContribFilter] = useState("")
  const [inputFilter, setInputFilter] = useState("")
  // const prevFilter = useRef(contribFilter)

  const title = "Candidate Contributions"
  const subtitle = "For Position"
  const tableHeaders = [
    { title: "Name", category: "contributorName" },
    { title: "Contributor Type", category: "contributorType" },
    { title: "Occupation", category: "occupation" },
    { title: "Employer", category: "employer" },
    { title: "ZIP Code", category: "zipCode" },
    { title: "Amount", category: "contributionAmount" },
    { title: "Date", category: "date" },
  ]

  const contribTypeFilters = [
    { title: "Committee", category: "committee" },
    { title: "Individual", category: "individual" },
    { title: "Other (Includes Businesses)", category: "other" },
  ]

  function sortArray() {
    let sorted = [...CONTRIBUTOR_DATA.contributors].sort((e1, e2) => {
      if (sortBy === "contributionAmount") {
        return e2[sortBy] > e1[sortBy]
      }

      if (sortBy === "employer" || sortBy === "occupation") {
        return (
          (e1[sortBy] === "") - (e2[sortBy] === "") ||
          -(e1[sortBy] < e2[sortBy]) ||
          +(e1[sortBy] > e2[sortBy])
        )
      }

      return e1[sortBy] > e2[sortBy]
    })
    setOrder(false)
    setContributionData(sorted)
  }

  function filterContributions({ contributorName }) {
    return contributorName.toLowerCase().includes(inputFilter.toLowerCase())
  }

  function generateDataComponents(contributorType, component) {
    //To Do: Filter individual, committee, and all other posts
    const normalizedContribType = contributorType.toLowerCase()
    if (contribFilter) {
      if (contribFilter === "other") {
        if (
          normalizedContribType === "individual" ||
          normalizedContribType === "committee"
        ) {
          return
        }
      } else if (contribFilter !== normalizedContribType) {
        return
      }
    }

    return component()
  }

  useEffect(() => {
    if (prevSort.current !== sortBy) {
      sortArray()
      prevSort.current = sortBy
    } else if (prevOrder.current !== order) {
      const reversed = [...contributionData].reverse()
      setContributionData(reversed)
      prevOrder.current = order
    }
  }, [sortBy, order])

  return (
    <Layout
      title={title}
      description={subtitle}
      windowIsLarge={useWindowIsLarge()}
    >
      <header id="contributions-header">
        <LandingPageHero background="green" title={title} subtitle={subtitle} />
      </header>
      <main id="contributions-main-content" className={styles.container}>
        <div className={styles.totalRaised}>
          <h3>Total raised</h3>
          <h2>{formatDollars(CONTRIBUTOR_DATA.totalContributions)}</h2>
        </div>
        <div className={styles.contributions}>
          <h1>Contributions</h1>
          <div className={styles.sort}>
            <div className={styles.filters}>
              {contribTypeFilters.map((filter, i) => {
                const isSelected = filter.category === contribFilter
                return (
                  <div
                    key={`filter_${i}`}
                    className={[
                      styles.filterCategory,
                      isSelected && styles.selected,
                    ].join(" ")}
                    onClick={() => {
                      if (isSelected) {
                        setContribFilter("")
                      } else {
                        setContribFilter(filter.category)
                      }
                    }}
                  >
                    <p>{filter.title}</p>
                  </div>
                )
              })}
            </div>
            <div className={styles.search}>
              <input
                placeholder="Type to search..."
                value={inputFilter}
                onChange={({ target: { value } }) => {
                  setInputFilter(value)
                }}
              />
            </div>
          </div>
          {windowIsLarge ? (
            <table className={styles.contributionsTable}>
              <thead>
                <tr className={styles.tableHeader}>
                  {tableHeaders.map((header, i) => (
                    <th
                      key={`tableHeader_${i}`}
                      onClick={() => {
                        if (sortBy === header.category) {
                          setOrder(!order)
                        } else {
                          setSortBy(header.category)
                        }
                      }}
                    >
                      <p>{header.title}</p>
                      <SortArrow />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {contributionData
                  .filter(filterContributions)
                  .map((contributor, i) => {
                    return generateDataComponents(
                      contributor.contributorType,
                      () => (
                        <tr
                          className={styles.tableRow}
                          key={`tableRow_${i}_${contributor.contributorName}`}
                        >
                          <td>{contributor.contributorName}</td>
                          <td>{contributor.contributorType}</td>
                          <td>{contributor.occupation}</td>
                          <td>{contributor.employer}</td>
                          <td>{contributor.zipCode}</td>
                          <td>
                            {formatDollars(contributor.contributionAmount)}
                          </td>
                          <td>{contributor.contributionDate}</td>
                        </tr>
                      )
                    )
                  })}
              </tbody>
            </table>
          ) : (
            <div>
              {contributionData
                .filter(filterContributions)
                .map((contributor, i) => {
                  //To Do: Filter individual, committee, and all other posts
                  return generateDataComponents(
                    contributor.contributorType,
                    () => (
                      <div
                        className={styles.contribSmall}
                        key={`tableRow_${i}_${contributor.contributorName}`}
                      >
                        <h4>{contributor.contributorName}</h4>
                        <div className={styles.contribSmallRow}>
                          <p className={styles.contribTypeSmall}>
                            {contributor.contributorType}
                          </p>
                          <span>
                            {formatDollars(contributor.contributionAmount)}
                          </span>
                        </div>
                        <div className={styles.contribSmallRow}>
                          <p>ZIP Code: {contributor.zipCode}</p>
                          <p>{contributor.contributionDate}</p>
                        </div>
                        {contributor.contributorType === "Individual" ? (
                          <div className={styles.contribSmallRow}>
                            <p>
                              {contributor.occupation}, {contributor.employer}
                            </p>
                          </div>
                        ) : null}
                      </div>
                    )
                  )
                })}
            </div>
          )}
        </div>
      </main>
    </Layout>
  )
}
