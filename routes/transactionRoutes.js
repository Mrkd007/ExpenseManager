const express = require("express");
const {
	addTransaction,
	getAllTransaction,
} = require("../controllers/transactionController");

// router object
const router = express.Router();

// routes
// add transaction || POST
router.post("/add-transaction", addTransaction);

// add transaction || GET
router.post("/get-transaction", getAllTransaction);

module.exports = router;
