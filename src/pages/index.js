import React from "react"
import indexStyles from "./index.module.css"
import { Link } from "gatsby"
import "typeface-roboto"
import Layout from "../components/layout"

export default () => (
  <Layout>
    <div className={indexStyles.primaryContainer}>
      <div>
        <h1 className={indexStyles.header}>
          Track the money in San José elections
        </h1>
      </div>
      <ul className={indexStyles.headerList}>
        <li className={indexStyles.headerListItem}>
          Who is contributing to the candidates?
        </li>
        <li className={indexStyles.headerListItem}>
          How much money has each candidate raised?
        </li>
        <li className={indexStyles.headerListItem}>
          Who is spending money to influence local ballot measures outcomes?
        </li>
        <li className={indexStyles.headerListItem}>
          Are the sources of political spending local?
        </li>
      </ul>
      <div>
        <h2 className={indexStyles.subheader}>
          Total contributions flowing into San José’s 2018 Election:
        </h2>
      </div>
      <p className={indexStyles.amount}>$6,297,678</p>
      <button className={indexStyles.headerButton}>
        <Link className={indexStyles.headerButtonText} to="/page-2/">
          Follow the money
        </Link>
      </button>
      <div className={indexStyles.credit}>
        <p>
          Modified from source by{" "}
          <a href="https://unsplash.com/@odya_kun?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge">
            Andrii Ganzevych
          </a>
        </p>
      </div>
    </div>
    <div className={indexStyles.subContainer}>
      <div>
        <h3 className={indexStyles.topText}>
          Open Disclosure was created to empower San José voters with timely,
          accurate, and useful information about the role of money in local
          elections.
        </h3>
      </div>
      <div>
        <p className={indexStyles.subText}>
          This site pulls data from the City of San José’s campaign finance
          reporting database to produce easy to understand graphs that clearly
          show the source of campaign funds and how they are being spent to sway
          election results. Our goal is to increase government transparency by
          revealing the potential influence behind local politics.
        </p>
      </div>
      <div>
        <p className={indexStyles.subText}>
          We hope to raise awareness, promote electoral accountability, and
          promote civic engagement and political participation by Oakland
          residents.
        </p>
      </div>
    </div>
    <div className={indexStyles.border} />

    <div className={indexStyles.subContainer}>
      <div>
        <h3 className={indexStyles.topText}>
          Sign up for daily campaign finance alerts.
        </h3>
      </div>
      <div>
        <p className={indexStyles.subText}>
          Every day, San José's lobbyists, candidates, and decisionmakers are
          required to disclose their finances. Open Disclosure Alerts help you
          stay on top of the influence of money on your local politics.
        </p>
      </div>
      <button className={indexStyles.headerButton}>
        <Link className={indexStyles.headerButtonText} to="/page-2/">
          Sign up for daily alerts
        </Link>
      </button>
    </div>
  </Layout>
)
