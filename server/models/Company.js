const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name_company: {
    type: String,
    required: true
  },
  employees: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  },
  board: {
    type: Schema.Types.ObjectId,
    ref: 'Board'
  },
  uuser: {
    type: Schema.Types.ObjectId,
    ref: 'Uuser'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Company', CompanySchema);
