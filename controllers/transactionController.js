const transactionModel = require("../models/transactionModel");
const moment = require("moment");

const getAllTransaction = async (req, res) => {
	try {
		const { frequency, userid, selectedDate, type } = req.body;
		const transaction = await transactionModel.find({
			...(frequency !== "custom"
				? {
						date: {
							$gt: moment().subtract(Number(frequency), "d").toDate(),
						},
				  }
				: {
						date: {
							$gte: selectedDate[0],
							$lte: selectedDate[1],
						},
				  }),
			...(type !== "all" && { type }),
			userid,
		});
		res.status(200).json(transaction);
	} catch (error) {
		res.status(400).json({
			success: false,
			error,
		});
	}
};

const addTransaction = async (req, res) => {
	try {
		const newTransaction = new transactionModel(req.body);
		await newTransaction.save();
		res.status(201).send("Transaction Created");
	} catch (error) {
		res.status(500).json({
			success: false,
			error,
		});
	}
};

module.exports = {
	getAllTransaction,
	addTransaction,
};
