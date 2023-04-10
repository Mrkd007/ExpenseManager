import { Progress } from "antd";
import React from "react";

const Analytics = ({ allTransation }) => {
	const totalTransaction = allTransation.length;
	const totalIncomeTransactions = allTransation.filter(
		(transaction) => transaction.type === "income",
	);
	const totalExpenseTransactions = allTransation.filter(
		(transaction) => transaction.type === "expense",
	);
	const totalIncomePercentage =
		(totalIncomeTransactions.length / totalTransaction) * 100;
	const totalExpensePercentage =
		(totalExpenseTransactions.length / totalTransaction) * 100;

	return (
		<>
			<div className='row m-3'>
				<div className='col-md-4'>
					<div className='card'>
						<div className='card-header'>
							Total Transaction : {totalTransaction}
						</div>
						<div className='card-body'>
							<h5 className='text-success'>
								Income : {totalIncomeTransactions.length}
							</h5>
							<h5 className='text-danger'>
								Expense : {totalExpenseTransactions.length}
							</h5>
							<div className='d-flex'>
								<Progress
									type='circle'
									strokeColor={"green"}
									className='m-2'
									percent={totalIncomePercentage.toFixed(0)}
								/>
								<Progress
									type='circle'
									strokeColor={"red"}
									className='m-2'
									percent={totalExpensePercentage.toFixed(0)}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Analytics;
