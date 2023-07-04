const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const storeuserController = require('../controllers/storeUsercontroller');
const loginController = require('../controllers/loginController');


/**
 * App Routes
 */
router.get('/', mainController.loginPage);
router.post('/', storeuserController);
router.post('/login', loginController);


module.exports = router;