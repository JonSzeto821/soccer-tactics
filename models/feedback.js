const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Feedback = new Schema({
    feedback: String,
    formationID: String,
    author: String,
    authorName: String,
    date: String
});

module.exports = mongoose.model('userFeedback', Feedback);