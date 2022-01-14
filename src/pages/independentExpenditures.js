import React from "react"
import useWindowIsLarge from "../common/hooks/useWindowIsLarge";
import LandingPageHero from "../components/landingPageHero";
import Layout from "../components/layout"
import SectionHeader from "../components/sectionHeader";

import styles from "./independentExpenditures.module.scss"

export default function IndependentExpenditures() {
    const title = "Independent Expenditures"
    const subtitle = "City of San Jose Independent Expenditures"
    return (
    <Layout
        title={title}
        windowIsLarge={useWindowIsLarge()}
        description={subtitle}>
        <header>
            <LandingPageHero title={title} subtitle={subtitle}/>
        </header>
        <main className={styles.container}>
            <SectionHeader 
                title="Independent Expenditures"
                subtitle="Learn what independent expenditures are and why they are important"
                isSubsection={false}
                isPageHeader={false}/>
            <iframe 
                title="Independent Expenditures Explanation"
                width="720" height="415" src="https://www.youtube.com/embed/ktaADxb4P5E"/>
        </main>
    </Layout>);
}