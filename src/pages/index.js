import React from "react"
import mainPageStyles from "./index.module.scss"
import Layout from "../components/layout"
import Button from "../components/button"
import Shadow from "../components/shadow"
import { ReactSVG } from "react-svg"
import blob from "./../../static/images/Blob.svg"
import MainPageSection from "../components/MainPageSection"
import snapshotStyles from "../components/snapshotItem.module.scss"
import candidateStyles from "../components/candidateItem.module.scss"
import miscStyles from "../components/miscItem.module.scss"

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

  sectionItem(title, description, items, renderItems, styles) {
    this.title = title
    this.description = description
    this.items = items
    this.styles = styles
    this.renderItems = () =>
      this.items.map(item => renderItems(item, this.styles))
  }

  renderSnapshotItems = (item, styles) => (
    <div className={styles.item}>
      <h2 className={styles.title}>{item.number}</h2>
      <p className={styles.description}>{item.description1}</p>
      <p className={styles.description}>{item.description2}</p>
    </div>
  )

  renderCandidateItems = (item, styles) => (
    <div className={styles.item}>
      <img className={styles.title} src={item.image} />
      <div>
        <h2 className={styles.title}>{item.name}</h2>
        <p className={styles.description}>{item.position}</p>
        <p className={styles.description}>{item.amount}</p>
      </div>
    </div>
  )

  renderMiscItems = (item, styles) => (
    <div className={styles.item}>
      <img className={styles.title} src={item.image} />
      <p className={styles.description}>{item.description1}</p>
      <p className={styles.description}>{item.description2}</p>
      <Button text={item.buttonText} />
    </div>
  )

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

    const snapshot = new this.sectionItem(
      "San José live election snapshot",
      "See which San José candidates are raising and spending the most in local elections.",
      [
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
      this.renderSnapshotItems,
      snapshotStyles
    )

    const candidates = new this.sectionItem(
      "Get the facts before you vote",
      "Find out which San José candidates are raising and spending the most in local elections.",
      [
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
      this.renderCandidateItems,
      candidateStyles
    )

    const misc = new this.sectionItem(
      "Go behind the scenes",
      "Over $6,404,634 flowing into 2020 San Jose elections.",
      [
        {
          title: "Take action on measures",
          description1: "Track who opposes or supports",
          description2: "upcoming ballot measures.",
          buttonText: "View ballot measures",
          image: "https://picsum.photos/300",
        },
        {
          title: "Compare local candidates",
          description1: "See who’s spending and raising",
          description2: "the most.",
          buttonText: "Browse candidates",
          image: "https://picsum.photos/300",
        },
        {
          title: "Get the finance facts",
          description1: "Learn more about campaign",
          description2: "finance data.",
          buttonText: "Visit FAQs",
          image: "https://picsum.photos/300",
        },
      ],
      this.renderMiscItems,
      miscStyles
    )

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
                <Button secondary text="View measures" />
                <Button text="Explore candidates" />
              </div>
            </div>
            <div className={mainPageStyles.heroRight}>
              <ReactSVG src={blob} />
            </div>
          </section>
          <MainPageSection secondary {...snapshot}></MainPageSection>
          <MainPageSection offWhite {...candidates}></MainPageSection>
          <MainPageSection {...misc}></MainPageSection>

          {/* <section className={mainPageStyles.explore}>
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
                  <Button
                    textStyle={{ fontWeight: "normal" }}
                    text={item.button}
                  />
                </div>
              ))}
            </div>
          </section>
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
