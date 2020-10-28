// Libraries
import React from "react"
// Styles
import styles from "./aboutUs.module.scss"
import Layout from "../components/layout"
// Components
import LandingPageHero from "../components/landingPageHero"
import TeamMembers from "../components/teamMembers"
// Utilities
import useWindowIsLarge from "../common/hooks/useWindowIsLarge"
import { sortTeamByAlphabeticalOrder } from "../common/util/sorting"
// Images
import Alex from "../images/alex.jpg"
import Geraldine from "../images/geraldine.jpg"
import Ryan from "../images/ryan.jpg"

export default function AboutUs() {
  const title = "About Us"
  const subtitle = "On a mission to promote local government accountability"
  const currentTeam = sortTeamByAlphabeticalOrder([
    {
      name: "Alex P",
      position: "Frontend / Co-lead",
      github: "alessandro-pianetta",
      image: Alex,
      lead: true,
    },
    {
      name: "Geraldine E",
      position: "Backend",
      github: "geleazar1000111",
      image: Geraldine,
    },
    { name: "Ryan W", position: "Backend", image: Ryan },
    { name: "Darren P", position: "Backend / Co-lead", lead: true },
    { name: "Emily J", position: "Frontend" },
    { name: "Mark N", position: "Frontend" },
    { name: "Coco M", position: "Backend" },
    { name: "Diane L", position: "UX & Design" },
    { name: "Irina R", position: "UX & Design" },
  ])
  const alumni = sortTeamByAlphabeticalOrder([
    { name: "Helen", position: "Project Lead", lead: true },
    { name: "Jacky H", position: "Backend" },
    { name: "Karan B", position: "Backend" },
    { name: "Tim W", position: "Frontend" },
    { name: "Guy W", position: "Frontend" },
  ])

  return (
    <Layout
      title={title}
      description={subtitle}
      windowIsLarge={useWindowIsLarge()}
    >
      <header id="about-us-header">
        <LandingPageHero background="green" title={title} subtitle={subtitle} />
      </header>
      <main className={styles.container} id="about-us-main-content">
        <h1>About Open Disclosure San José</h1>
        <p>
          Open Disclosure was created to support transparency and integrity in
          local elections. We reveal the source of candidates’ funds to expose
          possible influence. We also show the source of money to support and
          oppose ballot measures. We publish campaign finance data in a way that
          is clear and accessible to give power to Oakland residents, strengthen
          local democracy, and build trust in our electoral system.
        </p>
        <h1>About the data</h1>
        <p>
          Open Disclosure was created to support transparency and integrity in
          local elections. We reveal the source of candidates’ funds to expose
          possible influence. We also show the source of money to support and
          oppose ballot measures. We publish campaign finance data in a way that
          is clear and accessible to give power to Oakland residents, strengthen
          local democracy, and build trust in our electoral system.
        </p>
        <h2>Current team:</h2>
        <TeamMembers team={currentTeam} />
        <h2>Alumni:</h2>
        <TeamMembers team={alumni} />
        <h2>Special thanks</h2>
        <p>
          Special thanks to{" "}
          <a href="https://www.opendisclosure.io/">
            Open Oakland&apos;s Open Disclosure
          </a>{" "}
          for the inspiration behind our project.
        </p>
      </main>
    </Layout>
  )
}
