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
import headerBlob from "./../../static/images/headerBlob.png"
import tertiary from "./../../static/images/Tertiary.png"
import blue from "./../../static/images/blue.png"
import orange from "./../../static/images/orange.png"
import green from "./../../static/images/green.png"
import aboutBlob from "./../../static/images/aboutBlob.png"
import learnMore from "./../../static/images/learnMore.png"
import voteBlob from "./../../static/images/voteBlob.png"
import registerToVote from "./../../static/images/registerToVote.png"
import useWindowIsLarge from "../common/hooks/useWindowIsLarge"

const formatDate = new Intl.DateTimeFormat("en-US", {
  dateStyle: "short",
})

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
  const currentElection = props.data.allElection.edges[0].node
  const lastScrape = new Date(
    props.data.allMetadata.edges[0].node.DateProcessed
  )
  let candidatesRunning = 0
  const candidateList = []
  currentElection.OfficeElections.forEach(election => {
    candidatesRunning += election.Candidates.length
    election.Candidates.forEach(candidate => {
      if (candidate) {
        let funding = 0
        candidate.Committees.forEach(committee => {
          funding += parseInt(committee.TotalFunding)
        })
        candidateList.push({
          name: candidate.Name,
          position: election.Title,
          amount: funding,
          image: "https://picsum.photos/180",
        })
      }
    })
  })

  const candidatesPageLink = `/${currentElection.Date}/candidates/${currentElection.OfficeElections[0].fields.slug}`
  const referendumsPageLink = `/${currentElection.Date}/referendums/${currentElection.Referendums[0].fields.slug}`

  const snapshot = {
    title: "San José live election snapshot",
    description: `Source: ${formatDate.format(
      lastScrape
    )} City of San José Campaign Finance Report`,
    items: [
      {
        number: "XXX",
        description: "Of donations from the city of San José",
      },
      {
        number: parseInt(currentElection.TotalContributions).toLocaleString(
          "en-US",
          {
            style: "currency",
            currency: "USD",
            maximumSignificantDigits: 3,
          }
        ),
        description: "Amount raised to date",
      },
      {
        number: candidatesRunning,
        description: "Candidates running",
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
    footer: () => (
      <Link to={candidatesPageLink}>
        <img alt="candidates" height="37px" width="285px" src={tertiary} />
      </Link>
    ),
  }

  const behindTheScenes = {
    title: "Go behind the scenes",
    description:
      "We pull data from the City of San José campaign finance reporting database to bring you accurate information about the role and source of money in politics.",
    items: [
      {
        title: "Take action on measures",
        description: "Track who opposes or supports upcoming ballot measures.",
        buttonText: "View ballot measures",
        image: blue,
        href: referendumsPageLink,
      },
      {
        title: "Compare local candidates",
        description: "See who’s spending and raising the most.",
        buttonText: "Browse candidates",
        image: orange,
        href: candidatesPageLink,
      },
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

  return (
    <Layout windowIsLarge={windowIsLarge}>
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
                  <Button text="Explore candidates" href={candidatesPageLink} />
                </div>
                <Button
                  secondary
                  text="View measures"
                  href={referendumsPageLink}
                />
              </div>
            </div>
            <div className={styles.heroRight}>
              <img alt="header" width="724px" src={headerBlob} />
            </div>
          </div>
        </header>
        <MainPageSection secondary {...snapshot} />
        <MainPageSection
          {...candidates}
          offWhite
          windowIsLarge={windowIsLarge}
        />
        <MainPageSection {...behindTheScenes} />
        <MainPagePic {...about} />
        <MainPagePic {...vote} reversed={windowIsLarge} />
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
              Committees {
                Name
                TotalFunding
              }
              fields {
                slug
              }
            }
          }
          Referendums {
            id
            Name
            Election {
              ElectionCycle
            }
            Committee {
              Name
              TotalFunding
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
