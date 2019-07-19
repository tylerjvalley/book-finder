const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Book = new Schema({
    book_title: {
        type: String
    },

    book_rating: {
        type: String
    },

    book_review: {
        type: String
    }
})



module.exports = mongoose.model('Book', Book);