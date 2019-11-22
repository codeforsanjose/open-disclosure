import React, { PureComponent } from "react"
import balanceDetailStyles from "./balanceDetails.module.css"

export class BalanceDetails extends PureComponent {
	render() {
		const { expenditure, amount, moreInfo } = this.props

		return (
			<div className={balanceDetailStyles.container}>
				<p className={balanceDetailStyles.subheading}>
					{expenditure ? "Money going out" : "Money coming in"}
				</p>
				<h2 className={balanceDetailStyles.moneyHeading}>
					{expenditure ? "Expenditures" : "Contributions"}
				</h2>
				<p className={balanceDetailStyles.moneyTotal}>${amount}</p>
				<div className={balanceDetailStyles.spendingList}></div>
				{moreInfo ? (
					<p className={balanceDetailStyles.contributions}>
						<a>See all contributions</a>
					</p>
				) : null}
			</div>
		)
	}
}

export default BalanceDetails
