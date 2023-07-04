const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CardSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        require: true
    },
    responsiblePerson: {
        type: String

    },
    deadline: {
        type: String,
        created: Date
    },
    workstatus: {
        type: String
        
    },
    board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',
        required: true
      }
});


module.exports = mongoose.model('Card', CardSchema);