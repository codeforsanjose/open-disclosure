import React, { PureComponent } from "react"
import ballotInfoStyles from "./ballotInfo.module.css"
import { Link } from "gatsby"

export default class BallotInfo extends PureComponent {
  candidates = [
    {
      name: "Sam Liccardo",
      incumbent: true,
      imgSrc:
        "http://www.sanjoseca.gov/images/pages/N146/Mayor-Sam-Liccardo-web.jpg",
      occupation: "Mayor",
      amountCollected: 501645,
    },
  ]

  convertToUSD = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  })

  render() {
    return (
      <div
        className={ballotInfoStyles.container}
        style={this.props.smallWindowStyle}
      >
        <div className={ballotInfoStyles.header}>
          <h2 className={ballotInfoStyles.officeTitle}>Mayor</h2>
        </div>
        <div className={ballotInfoStyles.candidateList}>
          {this.candidates.map((candidate, index) => (
            <div
              key={`candidate item ${index}`}
              className={ballotInfoStyles.candidateItem}
            >
              <div className={ballotInfoStyles.imageContainer}>
                <Link className={ballotInfoStyles.link} to={"/"}>
                  <img
                    src={candidate.imgSrc}
                    className={ballotInfoStyles.image}
                  />
                </Link>
              </div>
              <div className={ballotInfoStyles.candidateInfo}>
                <Link className={ballotInfoStyles.link} to={"/"}>
                  <p className={ballotInfoStyles.candidateName}>
                    {candidate.name}
                    {candidate.incumbent ? " - elected" : null}
                  </p>
                </Link>

                <p className={ballotInfoStyles.candidateOccupation}>
                  {candidate.occupation
                    ? candidate.incumbent
                      ? `Incumbent, ${candidate.occupation}`
                      : candidate.occupation
                    : "No occupation reported"}
                </p>
                {candidate.amountCollected ? (
                  <p className={ballotInfoStyles.amountCollected}>
                    amount collected{" "}
                    <span className={ballotInfoStyles.money}>
                      {this.convertToUSD.format(candidate.amountCollected)}
                    </span>
                  </p>
                ) : (
                  <p className={ballotInfoStyles.amountCollected}>
                    no contributions have been reported
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
