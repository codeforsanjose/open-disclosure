import React from "react"
import indexStyles from "./index.module.css"
import { Link } from "gatsby"
import "typeface-roboto"
import Layout from "../components/layout"

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

    return (
      <Layout windowIsLarge={windowIsGreaterThan760px}>
        <div className={indexStyles.primaryContainer}>
          <h1 className={indexStyles.header}>
            {windowIsGreaterThan760px
              ? "Track the money in San José elections"
              : "Open Disclosure San José"}
          </h1>
          {windowIsGreaterThan760px ? (
            <ul className={indexStyles.headerList}>
              <li className={indexStyles.headerListItem}>
                Who is contributing to the candidates?
              </li>
              <li className={indexStyles.headerListItem}>
                How much money has each candidate raised?
              </li>
              <li className={indexStyles.headerListItem}>
                Who is spending money to influence local ballot measures
                outcomes?
              </li>
              <li className={indexStyles.headerListItem}>
                Are the sources of political spending local?
              </li>
            </ul>
          ) : (
            <p className={indexStyles.headerListSmallText}>
              Bringing campaign money to light
            </p>
          )}
          {windowIsGreaterThan760px ? (
            <div>
              <h2 className={indexStyles.subheader}>
                Total contributions flowing into San José’s {this.electionYear}{" "}
                Election:
              </h2>
              <p className={indexStyles.totalFundsRaised}>
                {this.totalFundsRaised}
              </p>
            </div>
          ) : (
            <p className={indexStyles.subheaderSmallText}>
              Track the money in San José elections
            </p>
          )}
          <button className={indexStyles.button}>
            <Link className={indexStyles.buttonText} to="/electionInfo/">
              <strong className={indexStyles.headerButtonText}>
                Follow the money
              </strong>
            </Link>
          </button>
          <div className={indexStyles.imgCredit}>
            <p>
              Modified from source by{" "}
              <a href={this.splashImage.url}>{this.splashImage.photographer}</a>
            </p>
          </div>
        </div>
        <div className={indexStyles.landingDescription}>
          <h3 className={indexStyles.landingDescriptionHeader}>
            Open Disclosure was created to empower San José voters with timely,
            accurate, and useful information about the role of money in local
            elections.
          </h3>
          <p className={indexStyles.landingDescriptionParagraph}>
            This site pulls data from the City of San José’s campaign finance
            reporting database to produce easy to understand graphs that clearly
            show the source of campaign funds and how they are being spent to
            sway election results. Our goal is to increase government
            transparency by revealing the potential influence behind local
            politics.
          </p>
          <p className={indexStyles.landingDescriptionParagraph}>
            We hope to raise awareness, promote electoral accountability, and
            promote civic engagement and political participation by San José
            residents.
          </p>
        </div>

        <div className={indexStyles.border} />

        <div className={indexStyles.landingDescription}>
          <h3 className={indexStyles.landingDescriptionHeader}>
            Sign up for daily campaign finance alerts.
          </h3>
          <p className={indexStyles.landingDescriptionParagraph}>
            Every day, San José's lobbyists, candidates, and decisionmakers are
            required to disclose their finances. Open Disclosure Alerts help you
            stay on top of the influence of money on your local politics.
          </p>
          <button className={indexStyles.button}>
            <Link className={indexStyles.buttonText} to="/page-2/">
              Sign up for daily alerts
            </Link>
          </button>
        </div>
      </Layout>
    )
  }
}
