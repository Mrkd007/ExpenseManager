const express = require('express');
const { loginController, registerController } = require('../controllers/userController');

// router object
const router = express.Router();

// routers
// POST | LOGIN
router.post('/login', loginController);

// POST | ReEGISTER
router.post('/register', registerController);

module.exports = router;