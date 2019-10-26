import React, { PureComponent } from "react"
import ballotInfoStyles from "./ballotInfo.module.css"

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
      <div className={ballotInfoStyles.container}>
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
                <img
                  src={candidate.imgSrc}
                  className={ballotInfoStyles.image}
                />
              </div>
              <div className={ballotInfoStyles.candidateInfo}>
                <p className={ballotInfoStyles.candidateName}>
                  {candidate.name}
                  {candidate.incumbent ? " - elected" : null}
                </p>
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
