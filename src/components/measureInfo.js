import React, { PureComponent } from "react"

import measureInfoStyles from "./measureInfo.module.css"

export default class measureInfo extends PureComponent {
  render() {
    const { selectedCategory } = this.props

    return (
      <div className={measureInfoStyles.container}>
        <h1 className={measureInfoStyles.measureName}>
          {selectedCategory.measureName}
        </h1>
        <h2 className={measureInfoStyles.measureDescription}>
          {selectedCategory.description}
        </h2>
        <div className={measureInfoStyles.mainBorder} />
        <section className={measureInfoStyles.referendumSummary}>
          <h3>Summary</h3>
          <p>
            Shall the measure amending San José's Charter for the purposes of
            funding services to: expand access to early childhood and preschool
            education; improve high school and college graduation and career
            readiness; provide mentoring and college financial assistance; by
            establishing a $198, 30-year parcel tax for single family parcels
            and specified rates for other parcel types, raising approximately
            $25,000,000 – 30,000,000 annually, with citizen’s oversight, and
            exemptions for low-income households and others, be adopted?
            Percentage Needed to Pass: Two-thirds (2/3)
          </p>
          <p>
            <em>This text provided by Alameda County Registrar of Voters</em>
          </p>
        </section>
        <div className={measureInfoStyles.mainBorder} />
        <section className={measureInfoStyles.contributionDetails}>
          <h2>Contributions by region</h2>
        </section>
        <div className={measureInfoStyles.mainBorder} />
        <section className={measureInfoStyles.contributionDetails}>
          <h2>Contributions by type</h2>
        </section>
        <div className={measureInfoStyles.mainBorder} />
        <section className={measureInfoStyles.contributionDetails}>
          <h2>Spending breakdown by committee</h2>
        </section>
        <div className={measureInfoStyles.mainBorder} />
      </div>
    )
  }
}
