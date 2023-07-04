const Company = require('../models/Company');

exports.CompanyPage = async (req, res) => {
    res.render('Company-page', 
    { layout: '../views/layouts/company' });
  }
  exports.createCompany = async (req, res) => {
    try {
      // Extract the company details from the request body
      const { name_company, employees, board, uuser } = req.body;
  
      // Create a new instance of the Company model
      const company = new Company({
        name_company,
        employees,
        board,
        uuser
      });
      // Save the new company to the database
      const savedCompany = await company.save();
  
      res.redirect('/');
    } catch (error) {
      // console.log(error);
    }
  };

  

