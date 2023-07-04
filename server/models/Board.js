const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const BoardSchema = new Schema({

    board_title: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
      }
});

 module.exports = mongoose.model('Board', BoardSchema);

