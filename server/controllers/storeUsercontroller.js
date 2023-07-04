const UUser = require("../models/UUser");

module.exports = async (req, res) => {
  const { displayName, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await UUser.findOne({ email });
    if (existingUser) {
      req.flash('validationErrors', 'User already exists');
      req.flash('data', { email });
      return res.redirect('/');
    }

    // Create a new user
    const newUser = new UUser({ displayName, email, password });
    await newUser.save();

    // Pass userName to the rendering context
    const userName = newUser.displayName;

    // Redirect or perform any other desired actions
     res.redirect('/');
  } catch (error) {
    // console.error(error);
    // Handle error appropriately
  }
};