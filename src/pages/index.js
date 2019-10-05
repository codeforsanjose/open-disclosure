import React from "react"
import indexStyles from "./index.module.css"
import { Link } from "gatsby"

export default () => (
  <div className={indexStyles.container}>
    <h1 className={indexStyles.header}>
      Track the money in San José elections
    </h1>
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
    <h2 className={indexStyles.subheader}>
      Total contributions flowing into San José’s 2018 Election:
    </h2>
    <p className={indexStyles.amount}>$6,297,678</p>
    <button className={indexStyles.headerButton}>
      <Link className={indexStyles.headerButtonText} to="/page-2/">
        Follow the money
      </Link>
    </button>
  </div>
)

// <a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@odya_kun?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Andrii Ganzevych"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span style="display:inline-block;padding:2px 3px">Andrii Ganzevych</span></a>
