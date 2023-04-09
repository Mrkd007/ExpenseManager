const transactionModel = require("../models/transactionModel");

const getAllTransaction = async (req, res) => {
	try {
		const transaction = await transactionModel.find({
			userid: req.body.userid,
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