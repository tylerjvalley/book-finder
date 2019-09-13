const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BookSchema = new Schema({

    userId: {
        type: String,
        required: true
    },  
    
    book_title: {
        type: String,
        required: true
    },

    book_image: {
        type: String,
        required: true
    },

    book_link: {
        type: String,
    },

    book_rating: {
        type: String
    },

    book_review: {
        type: String
    },

    book_in_progress: {
        type: Boolean
    },

    book_completed: {
        type: Boolean
    }
})



module.exports = mongoose.model('Book', BookSchema);