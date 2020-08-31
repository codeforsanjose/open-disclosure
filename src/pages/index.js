// Libraries
import React from "react"
import { graphql } from "gatsby"
// Styles
import styles from "./index.module.scss"
// Components
import Layout from "../components/layout"
import Button from "../common/button/index"
import MainPageSection from "../components/mainPageSection"
import CandidateSection from "../components/candidateSection"
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

export default class MainPage extends React.PureComponent {
  state = { windowIsGreaterThan760px: true, width: 0 }
  updateWindowDimensions = this.updateWindowDimensions.bind(this)

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener("resize", this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({
      width: window.innerWidth,
      windowIsGreaterThan760px: window.innerWidth >= 760,
    })
  }

  snapshot = {
    title: "San José live election snapshot",
    description:
      "See which San José candidates are raising and spending the most in local elections.",
    items: [
      {
        number: "31%",
        description: "Of donations from the city of San José",
      },
      {
        number: "$335,992",
        description: "Amount raised to date",
      },
      {
        number: "34",
        description: "Candidates running",
      },
    ],
    renderItem: SnapshotItem,
  }

  candidates = {
    title: "Get the facts before you vote",
    description:
      "Find out which San José candidates are raising and spending the most in local elections.",
    items: [
      {
        name: "Sam Liccardo",
        position: "Mayor Incumbent",
        amount: "$654,876",
        image: "https://picsum.photos/180",
      },
      {
        name: "Steve Brown",
        position: "Mayoral candidate",
        amount: "$600,000",
        image: "https://picsum.photos/180",
      },
      {
        name: "Tyrone Wade",
        position: "Mayoral candidate",
        amount: "$52,100",
        image: "https://picsum.photos/180",
      },
    ],
    renderItem: CandidateItem,
    footer: () => (
      <img alt="candidates" height="37px" width="285px" src={tertiary} />
    ),
  }

  behindTheScenes = {
    title: "Go behind the scenes",
    description: "Over $6,404,634 flowing into 2020 San Jose elections.",
    items: [
      {
        title: "Take action on measures",
        description: "Track who opposes or supports upcoming ballot measures.",
        buttonText: "View ballot measures",
        image: blue,
      },
      {
        title: "Compare local candidates",
        description: "See who’s spending and raising the most.",
        buttonText: "Browse candidates",
        image: orange,
      },
      {
        title: "Get the finance facts",
        description: "Learn more about campaign finance data.",
        buttonText: "Visit FAQs",
        image: green,
      },
    ],
    renderItem: BehindTheScenesItem,
  }

  about = {
    title: "Power to the people",
    description:
      "Open Disclosure was created to empower San José voters with timely, accurate, and useful information about the role of money in local elections.",
    linkTo: "/",
    linkImg: learnMore,
    image: aboutBlob,
  }

  vote = {
    title: "Your voice matters",
    description:
      "Register to vote or see if you're already registered in less than two minutes.",
    linkTo: "/registerToVote",
    linkImg: registerToVote,
    image: voteBlob,
  }

  render() {
    return (
      <Layout windowIsLarge={this.state.windowIsGreaterThan760px}>
        <div className={styles.container}>
          <header className={styles.hero}>
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
                <Button
                  secondary
                  text="View measures"
                  containerStyle={
                    this.state.windowIsGreaterThan760px
                      ? { marginRight: "1.6rem" }
                      : { marginBottom: "1.6rem" }
                  }
                />
                <Button text="Explore candidates" />
              </div>
            </div>
            <div className={styles.heroRight}>
              <img
                alt="header"
                className="responsive"
                width="724px"
                src={headerBlob}
              />
            </div>
          </header>
          <MainPageSection secondary {...this.snapshot} />
          <CandidateSection
            candidates={this.candidates}
            windowIsLarge={this.state.windowIsGreaterThan760px}
          />
          <MainPageSection {...this.behindTheScenes} />
          <MainPagePic {...this.about} />
          <MainPagePic
            {...this.vote}
            reversed={this.state.windowIsGreaterThan760px}
          />
        </div>
      </Layout>
    )
  }
}

export const query = graphql`
  query {
    allCandidate {
      edges {
        node {
          Name
          Elections {
            ElectionCycle
            ElectionTitle
            Committees {
              Name
              TotalFunding
            }
          }
        }
      }
    }
    allElection {
      edges {
        node {
          Title
          TotalContributions
          OfficeElections {
            Candidates
            Title
            TotalContributions
          }
          Date
        }
      }
    }
  }
`
