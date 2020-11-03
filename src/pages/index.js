// Libraries
import React from "react"
import { graphql, Link } from "gatsby"
// Styles
import styles from "./index.module.scss"
// Components
import Layout from "../components/layout"
import Button from "../common/button/index"
import MainPageSection from "../components/mainPageSection"
import MainPagePic from "../components/mainPagePic"
import SnapshotItem from "../components/snapshotItem"
import CandidateItem from "../components/candidateItem"
import BehindTheScenesItem from "../components/behindTheScenesItem"
// Images
import headerBlob from "../images/headerBlob.png"
import tertiary from "../images/Tertiary.png"
import BlankProfile from "../images/blankProfile.png"
import blue from "../images/blue.png"
import orange from "../images/orange.png"
import green from "../images/green.png"
import aboutBlob from "../images/aboutBlob.png"
import learnMore from "../images/learnMore.png"
import voteBlob from "../images/voteBlob.png"
import registerToVote from "../images/registerToVote.png"
import useWindowIsLarge from "../common/hooks/useWindowIsLarge"
import { formatPercent } from "../common/util/formatters"
import { sortInDescendingOrder } from "../common/util/sorting"

const formatDate = new Intl.DateTimeFormat("en-US", {
  dateStyle: "short",
})

const getDigits = value => {
  return value.toString().length
}

const getSuffix = value => {
  let suffix = ""
  if (getDigits(value) >= 6 && getDigits(value) < 9) {
    suffix = "K"
  } else if (getDigits(value) >= 9 && getDigits(value) < 12) {
    suffix = "M"
  } else if (getDigits(value) >= 12 && getDigits(value) < 15) {
    suffix = "B"
  } else if (getDigits(value) >= 15 && getDigits(value) < 18) {
    suffix = "T"
  }
  return suffix
}

const formatTotalContributions = value => {
  let maximumSignificantDigits = 3
  if (value < 1000) {
    maximumSignificantDigits = 1
  } else if (value < 10000) {
    maximumSignificantDigits = 2
  }

  return (
    // TODO: This assumes that we have a number in the billions.
    // Need to fix this later.
    (parseInt(value) / 1000000).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumSignificantDigits,
    }) + getSuffix(value)
  )
}

const about = {
  title: "Power to the people",
  description:
    "Open Disclosure was created to empower San José voters with timely, accurate, and useful information about the role of money in local elections.",
  href: "/aboutUs",
  linkImg: learnMore,
  image: aboutBlob,
}

const vote = {
  title: "Your voice matters",
  description:
    "Register to vote or see if you're already registered in less than two minutes.",
  href: "/registerToVote",
  linkImg: registerToVote,
  image: voteBlob,
}

export default function MainPage(props) {
  const windowIsLarge = useWindowIsLarge()
  const {
    Date: ElectionDate,
    TotalContributions,
    OfficeElections,
    Referendums,
  } = props.data.allElection.edges[0].node
  const { DateProcessed } = props.data.allMetadata.edges[0].node
  const [processedDate, processedTime] = DateProcessed.split(" ")
  const timestamp = `${processedDate}T${processedTime}`
  let candidatesRunning = 0
  let candidateList = []
  let totalSJ = 0
  if (OfficeElections) {
    OfficeElections.forEach(election => {
      candidatesRunning += election.Candidates.length
      election.Candidates.forEach(candidate => {
        if (candidate) {
          candidateList.push({
            name: candidate.Name,
            position: election.Title,
            amount: candidate.TotalFunding,
            image:
              `/images/${candidate.jsonNode?.profilePhoto}` || BlankProfile,
            href: `/${ElectionDate}/candidate/${election.fields.slug}/${candidate.fields.slug}`,
          })
          totalSJ += candidate.FundingByGeo.SJ
        }
      })
    })

    candidateList = sortInDescendingOrder(candidateList, "amount")

    if (candidateList.length > 3) {
      candidateList = candidateList.slice(0, 3)
    }
  }

  const candidatesPageLink = OfficeElections
    ? `/${ElectionDate}/candidates/${OfficeElections[0].fields.slug}`
    : null
  const referendumsPageLink = Referendums
    ? `/${ElectionDate}/referendums/${Referendums[0].fields.slug}`
    : null

  const lastScrape = timestamp ? formatDate.format(new Date(timestamp)) : ""
  const snapshot = {
    title: "San José live election snapshot",
    description: `Source: ${lastScrape} City of San José Campaign Finance Report`,
    items: [
      {
        // This currently only includes data from candidates!
        // TODO: Add measure funding data once we have it
        number: formatPercent(totalSJ / TotalContributions),
        description: "Of donations from San José residents",
      },
      {
        number: formatTotalContributions(TotalContributions),
        description: "Amount raised to date",
      },
      {
        number: candidatesRunning,
        description: OfficeElections
          ? `Candidates running in ${OfficeElections.length - 1} races`
          : "Candidates running",
      },
    ],
    renderItem: SnapshotItem,
  }

  const candidates = {
    title: "Get the facts before you vote",
    description:
      "Money makes a difference in determining who wins elections.  Find out who's backing local candidates and influencing local government.",
    items: candidateList,
    renderItem: CandidateItem,
    // eslint-disable-next-line react/display-name
    footer: candidatesPageLink
      ? () => (
          <Link to={candidatesPageLink}>
            <img alt="candidates" height="37px" width="285px" src={tertiary} />
          </Link>
        )
      : candidatesPageLink,
  }

  const behindTheScenes = {
    title: "Go behind the scenes",
    description:
      "We pull data from the City of San José campaign finance reporting database to bring you accurate information about the role and source of money in politics.",
    items: [
      {
        title: "Get the finance facts",
        description: "Learn more about campaign finance data.",
        buttonText: "Visit FAQs",
        image: green,
        href: "/faq",
      },
    ],
    renderItem: BehindTheScenesItem,
  }
  if (candidatesPageLink) {
    behindTheScenes.items.unshift({
      title: "Compare local candidates",
      description: "See who’s spending and raising the most.",
      buttonText: "Browse candidates",
      image: orange,
      href: candidatesPageLink,
    })
  }
  if (referendumsPageLink) {
    behindTheScenes.items.unshift({
      title: "Take action on measures",
      description: "Track who opposes or supports upcoming ballot measures.",
      buttonText: "View ballot measures",
      image: blue,
      href: referendumsPageLink,
    })
  }

  return (
    <Layout title="Home" windowIsLarge={windowIsLarge}>
      <div className={styles.container}>
        <header className={styles.heroOuterContainer}>
          <div className={styles.heroInnerContainer}>
            <div className={styles.heroLeft}>
              <h1>
                More money,
                <br />
                more transparency.
              </h1>
              <h2>
                Keep tabs on the influence of money
                <br />
                in local San José elections.
              </h2>
              <div className={styles.heroButtonContainer}>
                <div className={styles.primaryCTA}>
                  {candidatesPageLink && (
                    <Button
                      text="Explore candidates"
                      href={candidatesPageLink}
                    />
                  )}
                </div>
                {referendumsPageLink && (
                  <Button
                    secondary
                    text="View measures"
                    href={referendumsPageLink}
                  />
                )}
              </div>
            </div>
            <div className={styles.heroRight}>
              <div className={styles.imageContainer}>
                <img
                  alt="A man and a women walking into San José City Hall"
                  src={headerBlob}
                />
              </div>
            </div>
          </div>
        </header>
        <main>
          <MainPageSection secondary {...snapshot} />
          <MainPageSection
            {...candidates}
            offWhite
            windowIsLarge={windowIsLarge}
          />
          <MainPageSection {...behindTheScenes} />
          <MainPagePic {...about} />
          <MainPagePic {...vote} reversed={windowIsLarge} />
        </main>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allElection {
      edges {
        node {
          Title
          Date
          TotalContributions
          OfficeElections {
            Title
            TotalContributions
            fields {
              slug
            }
            Candidates {
              Name
              jsonNode {
                profilePhoto
              }
              TotalFunding
              fields {
                slug
              }
              FundingByGeo {
                SJ
              }
            }
          }
          Referendums {
            id
            Name
            Election {
              ElectionCycle
            }
            fields {
              slug
            }
          }
        }
      }
    }
    allMetadata {
      edges {
        node {
          DateProcessed
        }
      }
    }
  }
`
