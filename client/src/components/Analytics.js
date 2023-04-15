import { Progress } from "antd";
import React from "react";

const Analytics = ({ allTransation }) => {
	const categories = [
		"salary",
		"tip",
		"project",
		"food",
		"movie",
		"bills",
		"medical",
		"rent",
		"tax",
		"others",
	];

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

	const totalTurnover = allTransation.reduce(
		(acc, transaction) => acc + transaction.amount,
		0,
	);

	const totalIncomeTurnover = totalIncomeTransactions.reduce(
		(acc, transaction) => acc + transaction.amount,
		0,
	);

	const totalExpenseTurnover = totalExpenseTransactions.reduce(
		(acc, transaction) => acc + transaction.amount,
		0,
	);

	const totalIncomeTurnoverPercentage =
		(totalIncomeTurnover / totalTurnover) * 100;
	const totalExpenseTurnoverPercentage =
		(totalExpenseTurnover / totalTurnover) * 100;

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
				<div className='col-md-4'>
					<div className='card'>
						<div className='card-header'>Total Turnover : {totalTurnover}</div>
						<div className='card-body'>
							<h5 className='text-success'>
								Total Income : {totalIncomeTurnover}
							</h5>
							<h5 className='text-danger'>
								Total Expense : {totalExpenseTurnover}
							</h5>
							<div className='d-flex'>
								<Progress
									type='circle'
									strokeColor={"green"}
									className='m-2'
									percent={totalIncomeTurnoverPercentage.toFixed(0)}
								/>
								<Progress
									type='circle'
									strokeColor={"red"}
									className='m-2'
									percent={totalExpenseTurnoverPercentage.toFixed(0)}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='row mt-3'>
				<div className='col-md-4'>
					<h4>Categorywise Income</h4>
					{categories.map((category) => {
						const amount = allTransation
							.filter(
								(transaction) =>
									transaction.type === "income" &&
									transaction.category === category,
							)
							.reduce((acc, transaction) => acc + transaction.amount, 0);

						return (
							amount > 0 && (
								<div className='card'>
									<div className='card-body'>
										<h5>{category}</h5>
										<Progress
											percent={((amount / totalIncomeTurnover) * 100).toFixed(
												0,
											)}
										/>
									</div>
								</div>
							)
						);
					})}
				</div>
				<div className='col-md-4'>
					<h4>Categorywise Expense</h4>
					{categories.map((category) => {
						const amount = allTransation
							.filter(
								(transaction) =>
									transaction.type === "expense" &&
									transaction.category === category,
							)
							.reduce((acc, transaction) => acc + transaction.amount, 0);

						return (
							amount > 0 && (
								<div className='card'>
									<div className='card-body'>
										<h5>{category}</h5>
										<Progress
											percent={((amount / totalExpenseTurnover) * 100).toFixed(
												0,
											)}
										/>
									</div>
								</div>
							)
						);
					})}
				</div>
			</div>
		</>
	);
};

export default Analytics;
