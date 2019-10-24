import React, { PureComponent } from "react"
import Layout from "../components/layout"
import electionInfoStyles from "./electionInfo.module.css"
import SideNav from "../components/sideNav"

export default class electionInfo extends PureComponent {
  electionDate = "November 6, 2018 Election"
  lastUpdated = "Content last updated Oct. 13, 2019"

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
              <SideNav />
            </div>
            <div className={electionInfoStyles.main}></div>
          </div>
        </div>
      </Layout>
    )
  }
}
