// Libraries
import React from "react"
// Styles
import mainPageStyles from "./index.module.scss"
// Components
import Layout from "../components/layout"
import Button from "../components/button"
import Shadow from "../components/shadow"
import MainPageSection from "../components/MainPageSection"
import MainPagePic from '../components/mainPagePic'
import SnapshotItem from '../components/snapshotItem'
import CandidateItem from '../components/candidateItem'
import BehindTheScenesItem from '../components/behindTheScenesItem'
// Images
import title from "./../../static/images/title.png"
import headerBlob from "./../../static/images/headerBlob.png"
import tertiary from './../../static/images/Tertiary.png'
import blue from './../../static/images/blue.png'
import orange from './../../static/images/orange.png'
import green from './../../static/images/green.png'
import aboutBlob from './../../static/images/aboutBlob.png'
import learnMore from './../../static/images/learnMore.png'
import voteBlob from './../../static/images/voteBlob.png'
import registerToVote from './../../static/images/registerToVote.png'


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

  about = {
    title: 'Power to the people',
    description: 'Open Disclosure was created to empower San José voters with timely, accurate, and useful information about the role of money in local elections',
    linkTo: '/',
    linkImg: learnMore,
    image: aboutBlob,
  }

  vote = {
    title: 'Your voice matters',
    description: 'Register to vote or see if you\'re already registered in less than two minutes',
    linkTo: '/',
    linkImg: registerToVote,
    image: voteBlob,
  }


  render() {
    const { windowIsGreaterThan760px } = this.state

    return (
      <Layout windowIsLarge={windowIsGreaterThan760px}>
        <div className={mainPageStyles.container}>
          <header className={mainPageStyles.hero}>
            <div className={mainPageStyles.heroLeft}>
              <img height='232px' width='607px' src={title} />
              <div className={mainPageStyles.heroButtonContainer}>
                <Button secondary text="View measures" containerStyle={{marginRight: '1.6rem'}}/>
                <Button text="Explore candidates" />
              </div>
            </div>
            <div className={mainPageStyles.heroRight}>
              <img height='701' width='724' src={headerBlob} />
            </div>
          </header>

          <MainPageSection secondary {...this.snapshot}></MainPageSection>
          <MainPageSection offWhite {...this.candidates}></MainPageSection>
          <MainPageSection {...this.behindTheScenes}></MainPageSection>
          <MainPagePic {...this.about} />
          <MainPagePic {...this.vote} reversed />

        </div>
      </Layout>
    )
  }
}