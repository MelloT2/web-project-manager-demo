const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')


const UUserSchema = new Schema({
displayName: {
    type: String,
    required: true
  },
email: {
    type: String,
    required: [true]
  },
  password: {
    type: String,
    required: [true]
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updateAt: {
    type: Date,
    default: Date.now()
  }
});


UUserSchema.pre('save', function(next) {
    const user = this;
  
    // Generate a salt and hash the password
    bcrypt.hash(user.password, 10)
      .then(hash => {
        user.password = hash;
        next();
      })
      .catch(error=> {
        console.error(error)
      });
  });
  
  module.exports = mongoose.model('Uuser', UUserSchema);