import React from "react"
import mainPageStyles from "./index.module.scss"
import { Link } from "gatsby"
import "typeface-roboto"
import "typeface-bitter"
import Layout from "../components/layout"
import Button from "../components/button"
import Shadow from "../components/shadow"

export default class MainPage extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { windowIsGreaterThan760px: true }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    this.splashImage = {
      photographer: "Andrii Ganzevych",
      url:
        "https://unsplash.com/@odya_kun?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge",
    }
    this.totalFundsRaised = "$6,297,678"
    this.electionYear = "2018"
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

  render() {
    const { windowIsGreaterThan760px } = this.state
    const explore = [
      {
        header: "Compare local candidates",
        subheader: "See who's spending and raising the most",
        button: "Compare candidates",
      },
      {
        header: "Take action on measures",
        subheader: "Track spending on upcoming ballot measures",
        button: "View ballot measures",
      },
      {
        header: "Get the finance facts",
        subheader: "Learn more about campaign finance data",
        button: "Get informed",
      },
    ]

    return (
      <Layout windowIsLarge={windowIsGreaterThan760px}>
        <div className={mainPageStyles.container}>
          <section className={mainPageStyles.header}>
            <h1 className={mainPageStyles.headerText}>
              More Money,
              <br />
              More Transparency.
            </h1>
            <h3 className={mainPageStyles.headerSubtext}>
              Track the money in San José elections
            </h3>
            <Shadow color="#ff5c66">
              <Button text="Follow the money" />
            </Shadow>
          </section>
          <section className={mainPageStyles.explore}>
            <h1 className={mainPageStyles.exploreHeader}>Explore the Data</h1>
            <p className={mainPageStyles.exploreSubheader}>
              Over $6,404,634 flowing into 2020 San Jose elections
            </p>
            <div className={mainPageStyles.sectionItemContainer}>
              {explore.map((item, i) => (
                <div id={`item ${i}`} className={mainPageStyles.sectionItem}>
                  <img src="https://picsum.photos/337/164" />
                  <h3 className={mainPageStyles.sectionItemHeader}>
                    {item.header}
                  </h3>
                  <p className={mainPageStyles.sectionItemSubheader}>
                    {item.subheader}
                  </p>
                  <Button textStyle={{ fontSize: "2rem" }} text={item.button} />
                </div>
              ))}
            </div>
          </section>
          <section className={mainPageStyles.about}>
            <div className={mainPageStyles.aboutText}>
              <h1>Committed to Fact-Based Reporting</h1>
              <p>
                Open Disclosure was created to empower San Jose voters with
                timely, accurate, and useful information about the role of money
                in local elections.
              </p>
              <h3>About Open San Jose</h3>
            </div>
            <div className={mainPageStyles.aboutImage}>
              <Shadow reverse big color="rgba(234, 60, 71, 0.8)">
                <img src="https://picsum.photos/340/300" />
              </Shadow>
            </div>
          </section>
          <section
            className={`${mainPageStyles.about} ${mainPageStyles.reverse}`}
          >
            <div className={mainPageStyles.aboutText}>
              <h1>Register to Vote</h1>
              <p>
                Make your voice heard. Register to vote in less than 2 minutes.
              </p>
              <h3>Register to vote</h3>
            </div>
            <div className={mainPageStyles.aboutImage}>
              <Shadow reverse big color="rgba(64, 150, 199, 0.8)">
                <img src="https://picsum.photos/340/300" />
              </Shadow>
            </div>
          </section>
        </div>
      </Layout>
    )
  }
}
