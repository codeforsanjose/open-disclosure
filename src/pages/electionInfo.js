import React, { PureComponent } from "react"
import Layout from "../components/layout"
import electionInfoStyles from "./electionInfo.module.css"
import SideNav from "../components/sideNav"
import BallotInfo from "../components/ballotInfo"

export default class electionInfo extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { windowIsGreaterThan760px: true }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    this.electionDate = "November 6, 2018 Election"
    this.lastUpdated = "Content last updated Oct. 13, 2019"
    this.menuItems = [
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
            description:
              "Hotel Employee Minimum Wage and Workplace Protections",
          },
        ],
      },
    ]
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener("resize", this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({ windowIsGreaterThan760px: window.innerWidth >= 760 })
  }

  applySmallWindowStyle = style => {
    const { windowIsGreaterThan760px } = this.state
    return windowIsGreaterThan760px ? {} : style
  }

  render() {
    const { windowIsGreaterThan760px } = this.state

    return (
      <Layout windowIsLarge={windowIsGreaterThan760px}>
        <div className={electionInfoStyles.container}>
          <header
            className={electionInfoStyles.header}
            style={this.applySmallWindowStyle({
              flexDirection: "column",
            })}
          >
            <h1 className={electionInfoStyles.title}>San José</h1>
            <h2
              className={electionInfoStyles.date}
              style={this.applySmallWindowStyle({
                float: "none",
                margin: 0,
              })}
            >
              {this.electionDate}
            </h2>
            <p
              className={electionInfoStyles.updatedAt}
              style={this.applySmallWindowStyle({
                float: "none",
                margin: 0,
              })}
            >
              {this.lastUpdated}
            </p>
          </header>
          <div
            className={electionInfoStyles.body}
            style={this.applySmallWindowStyle({
              flexDirection: "column-reverse",
            })}
          >
            <div className={electionInfoStyles.sidebar}>
              <SideNav
                menuItems={this.menuItems}
                smallWindowStyle={this.applySmallWindowStyle({
                  padding: "0rem 1.6rem",
                })}
              />
            </div>
            <div
              className={electionInfoStyles.main}
              style={this.applySmallWindowStyle({
                borderBottom: "2px #ffdd1f solid",
              })}
            >
              <BallotInfo
                smallWindowStyle={this.applySmallWindowStyle({
                  padding: "0.9rem 0 1.8rem",
                })}
              />
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
