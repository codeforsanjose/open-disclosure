// Libraries
import React from "react"
// Styles
import mainPageStyles from "./index.module.scss"
// Components
import Layout from "../components/layout"
import Button from "../components/button"
import Shadow from "../components/shadow"
import MainPageSection from "../components/MainPageSection"
import SnapshotItem from '../components/snapshotItem'
import CandidateItem from '../components/candidateItem'
import BehindTheScenesItem from '../components/behindTheScenesItem'
// Images
import blob from "./../../static/images/Blob.png"
import tertiary from './../../static/images/Tertiary.png'
import blue from './../../static/images/blue.png'
import orange from './../../static/images/orange.png'
import green from './../../static/images/green.png'


export default class MainPage extends React.PureComponent {
  state = { windowIsGreaterThan760px: true }
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
      windowIsGreaterThan760px: window.innerWidth >= 760,
    })
  }

  snapshot = {
    title: "San José live election snapshot",
    description: "See which San José candidates are raising and spending the most in local elections.",
    items: [
      {
        number: "31%",
        description1: "Of donations",
        description2: "from the city of San José",
      },
      {
        number: "$335,992",
        description1: "Amount raised",
        description2: "to date",
      },
      {
        number: "34",
        description1: "Candidates",
        description2: "running",
      },
    ],
    renderItems: SnapshotItem,
  }

  candidates = {
    title: "Get the facts before you vote",
    description: "Find out which San José candidates are raising and spending the most in local elections.",
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
    renderItems: CandidateItem,
    footer: () => (<img height='37px' width='285px' src={tertiary} />)
  }

  behindTheScenes = {
    title: "Go behind the scenes",
    description: "Over $6,404,634 flowing into 2020 San Jose elections.",
    items: [
      {
        title: "Take action on measures",
        description1: "Track who opposes or supports",
        description2: "upcoming ballot measures.",
        buttonText: "View ballot measures",
        image: blue,
      },
      {
        title: "Compare local candidates",
        description1: "See who’s spending and raising",
        description2: "the most.",
        buttonText: "Browse candidates",
        image: orange,
      },
      {
        title: "Get the finance facts",
        description1: "Learn more about campaign",
        description2: "finance data.",
        buttonText: "Visit FAQs",
        image: green,
      },
      ],
    renderItems: BehindTheScenesItem
  }

  render() {
    const { windowIsGreaterThan760px } = this.state

    return (
      <Layout windowIsLarge={windowIsGreaterThan760px}>
        <div className={mainPageStyles.container}>
          <section className={mainPageStyles.hero}>
            <div className={mainPageStyles.heroLeft}>
              <h1 className={mainPageStyles.heroText}>
                More money,
                <br />
                more transparency.
              </h1>
              <div />
              <h3 className={mainPageStyles.heroSubtext}>
                Keep tabs on the influence of money
                <br />
                in local San José elections.
              </h3>
              <div className={mainPageStyles.heroButtonContainer}>
                <Button secondary text="View measures" containerStyle={{marginRight: '1.6rem'}}/>
                <Button text="Explore candidates" />
              </div>
            </div>
            <div className={mainPageStyles.heroRight}>
              <img height='701' width='724' src={blob} />
            </div>
          </section>
          
          <MainPageSection secondary {...this.snapshot}></MainPageSection>
          <MainPageSection offWhite {...this.candidates}></MainPageSection>
          <MainPageSection {...this.behindTheScenes}></MainPageSection>
          
          {/* 
          <section className={mainPageStyles.about}>
            <div className={mainPageStyles.aboutText}>
              <h1>Power to the People</h1>
              <p>
                Open Disclosure was created to empower San Jose voters with
                timely, accurate, and useful information about the role of money
                in local elections.
              </p>
              <h3>Learn More -></h3>
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
          </section> */}
        </div>
      </Layout>
    )
  }
}
