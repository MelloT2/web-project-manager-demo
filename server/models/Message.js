const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  cardID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card'
  },
  message: {
    type: String,
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.model('Message', chatMessageSchema);

module.exports = Message;