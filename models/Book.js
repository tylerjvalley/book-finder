const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Book = new Schema({

    book_title: {
        type: String,
        required: true
    },

    book_image: {
        type: String,
        required: true
    },

    book_rating: {
        type: String
    },

    book_review: {
        type: String
    },

    book_in_progress: {
        type: String
    },

    book_completed: {
        type: String
    }
})



module.exports = mongoose.model('Book', Book);