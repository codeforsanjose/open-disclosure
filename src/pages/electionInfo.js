import React, { PureComponent } from "react"
import Layout from "../components/layout"
import electionInfoStyles from "./electionInfo.module.css"
import SideNav from "../components/sideNav"
import BallotInfo from "../components/ballotInfo"

export default class electionInfo extends PureComponent {
  electionDate = "November 6, 2018 Election"
  lastUpdated = "Content last updated Oct. 13, 2019"
  menuItems = [
    {
      sectionName: "City-Wide Office",
      sectionItems: ["Mayor", "City Auditor"],
    },
    {
      sectionName: "City Council",
      sectionItems: [
        "City Council District 2",
        "City Council District 4",
        "City Council District 6",
      ],
    },
    {
      sectionName: "San José Unified School District",
      sectionItems: [
        "SJUSD District 2",
        "SJUSD District 4",
        "SJUSD District 6",
      ],
    },
    {
      sectionName: "Ballot Measures",
      sectionItems: [
        {
          measureName: "Measure AA",
          description: "San José Children's Initiative",
        },
        {
          measureName: "Measure V",
          description: "Cannabis Business Tax",
        },
        {
          measureName: "Measure W",
          description: "Vacant Property Parcel Tax",
        },
        {
          measureName: "Measure X",
          description: "Tiered Real Property Transfer Tax",
        },
        {
          measureName: "Measure Y",
          description: "Just Cause Eviction Agreements",
        },
        {
          measureName: "Measure Z",
          description: "Hotel Employee Minimum Wage and Workplace Protections",
        },
      ],
    },
  ]

  render() {
    return (
      <Layout>
        <div className={electionInfoStyles.container}>
          <header className={electionInfoStyles.header}>
            <h1 className={electionInfoStyles.title}>San José</h1>
            <h2 className={electionInfoStyles.date}>{this.electionDate}</h2>
            <p className={electionInfoStyles.updatedAt}>{this.lastUpdated}</p>
          </header>
          <div className={electionInfoStyles.body}>
            <div className={electionInfoStyles.sidebar}>
              <SideNav menuItems={this.menuItems} />
            </div>
            <div className={electionInfoStyles.main}>
              <BallotInfo />
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
