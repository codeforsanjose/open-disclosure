import React, { PureComponent } from "react"
import {
	FaDesktop,
	FaTwitter,
	FaExternalLinkAlt,
	FaRegQuestionCircle,
} from "react-icons/fa"
import candidateInfoStyles from "./candidateInfo.module.css"
import BalanceDetails from "./balanceDetails"

export default class CandidateInfo extends PureComponent {
	candidateLinks = [
		{ icon: <FaDesktop />, text: "https://www.samliccardo.com", url: "" },
		{ icon: <FaTwitter />, text: "sliccardo", url: "" },
		{ icon: <FaExternalLinkAlt />, text: "Voter's Edge Profile", url: "" },
	]

	render() {
		return (
			<div className={candidateInfoStyles.container}>
				<h2 className={candidateInfoStyles.candidateName}>
					Sam Liccardo - elected
				</h2>
				<div className={candidateInfoStyles.mainBorder} />
				<section className={candidateInfoStyles.header}>
					<div className={candidateInfoStyles.headerLeft}>
						<div
							style={{
								backgroundImage:
									"url(http://www.sanjoseca.gov/images/pages/N146/Mayor-Sam-Liccardo-web.jpg)",
							}}
							className={candidateInfoStyles.image}
						/>
					</div>
					<div className={candidateInfoStyles.headerRight}>
						<p className={candidateInfoStyles.candidateOccupation}>
							Incumbent | Sam Liccardo for Mayor 2018
						</p>
						<p className={candidateInfoStyles.expenditureCeiling}>
							This candidate has agreed to voluntary spending limits. The
							maximum contribution this candidate can accept is $800 from any
							individual, business entity, committee or other organization and
							$1,600 from a qualified broad-based committee.
							<span className={candidateInfoStyles.hoverInfoContainer}>
								<FaRegQuestionCircle />
								<span className={candidateInfoStyles.hoverInfo}>
									<p>
										For more on Oakland contribution limits and campaign rules,
										see the{" "}
										<a>Public Ethics Commission Candidate Resources page</a>.
									</p>
								</span>
							</span>
						</p>
						<ul className={candidateInfoStyles.candidateLinks}>
							{this.candidateLinks.map(link => (
								<li className={candidateInfoStyles.candidateLink}>
									{link.icon}
									<a>{link.text}</a>
								</li>
							))}
						</ul>
					</div>
				</section>
				<div className={candidateInfoStyles.mainBorder} />
				<section className={candidateInfoStyles.currentBalance}>
					<div className={candidateInfoStyles.candidateContributions}>
						<p>Contributions:</p>
						<p>$501,645</p>
					</div>
					<div className={candidateInfoStyles.candidateExpenditures}>
						<p>Expenditures:</p>
						<p>$461,266</p>
					</div>
					<div className={candidateInfoStyles.subBorder} />
					<div className={candidateInfoStyles.candidateBalance}>
						<p>Current balance:</p>
						<p>$40,379</p>
					</div>
				</section>
				<div className={candidateInfoStyles.mainBorder} />
				<section className={candidateInfoStyles.balanceDetails}>
					<div className={candidateInfoStyles.row}>
						<BalanceDetails amount={"501,645"} moreInfo />
						<BalanceDetails expenditure amount={"461,266"} />
					</div>
				</section>
				<div className={candidateInfoStyles.mainBorder} />
				<section className={candidateInfoStyles.balanceDetails}>
					<div className={candidateInfoStyles.row}>
						<BalanceDetails amount={"501,645"} />
					</div>
				</section>
				<div className={candidateInfoStyles.mainBorder} />
				<section className={candidateInfoStyles.candidateCommittees}>
					<h2 className={candidateInfoStyles.candidateCommitteesHeader}>
						Other committees controlled by this candidate
					</h2>
					<ul>
						<li>
							<a>Sam Liccardo for Council 2010</a>
						</li>
					</ul>
				</section>
				<div className={candidateInfoStyles.mainBorder} />
				<section className={candidateInfoStyles.independentExpenditures}>
					<div className={candidateInfoStyles.row}>
						<p className={candidateInfoStyles.independentExpendituresHeader}>
							Independent expenditures supporting candidate
							<span className={candidateInfoStyles.hoverInfoContainer}>
								<FaRegQuestionCircle />
								<span className={candidateInfoStyles.hoverInfo}>
									<p>
										Spending by third parties that advocates the election or
										defeat of a candidate and is not made in coordination with a
										candidate or campaign committee is termed an independent
										expenditure. To learn more, <a>see the FAQ</a>.
									</p>
								</span>
							</span>
						</p>
						<span className={candidateInfoStyles.independentExpendituresAmount}>
							$7672
						</span>
					</div>
				</section>
				<div className={candidateInfoStyles.mainBorder} />
				<section className={candidateInfoStyles.spendingBreakdown}>
					<h2 className={candidateInfoStyles.spendingBreakdownHeader}>
						Spending breakdown by committee
					</h2>
					<div
						className={candidateInfoStyles.spendingBreakdownContentContainer}
					>
						<div className={candidateInfoStyles.spendingBreakdownContent}>
							<p className={candidateInfoStyles.spendingBreakdownSubheader}>
								In support of the candidate
							</p>
						</div>
						<div className={candidateInfoStyles.spendingBreakdownContent}>
							<p className={candidateInfoStyles.spendingBreakdownSubheader}>
								In opposition of the candidate
							</p>
						</div>
					</div>
				</section>
			</div>
		)
	}
}
