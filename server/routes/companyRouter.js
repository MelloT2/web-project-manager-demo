const express = require('express');
const companyController = require('../controllers/companyController');
const router = express.Router();

router.get('/company',companyController.CompanyPage);
// router.get('/:companyId', companyController.getCompany);
router.post('/company/add-company',companyController.createCompany);

module.exports = router;


