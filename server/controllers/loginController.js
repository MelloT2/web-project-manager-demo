const UUser = require("../models/UUser");
const bcrypt = require("bcrypt");


// router.post('/login', (req, res) => {
//   // Authenticate the user and retrieve the company ID
//   const companyId = ...; // Retrieve the company ID from the authentication process

//   // Store the company ID in the session
//   req.session.companyId = companyId;

//   res.redirect('/dashboard');
// });

module.exports = async (req, res) => {
  const { displayName, password } = req.body;

  try {
    // Find the user by display name
    const user = await UUser.findOne({ displayName });

    if (user) {
      // Compare the provided password with the hashed password
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (isPasswordMatch) {
        // Password matches, set the userId in the session
        req.session.userId = user._id;
        res.redirect('/dashboard');
      } else {
        // Password does not match
        res.redirect('/');
      }
    } else {
      // User not found
      res.redirect('/');
    }
  } catch (error) {
    // console.error(error);
    // Handle error appropriately
  }
};