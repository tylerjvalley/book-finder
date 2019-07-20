const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bookRoutes = express.Router();
const port = 3001;

let Book = require('./book.model');


app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/books', { useNewUrlParser: true }); //creates connection to mongo db
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});



bookRoutes.route('/').get((req, res) => {
    Book.find((err, books) => {
        if (err) {
            console.log(err)
        } else {
            res.json(books)
        }
    });
});

bookRoutes.route('/:id').get((req, res) => {
    //retrieve a single book based on id
    let id = req.params.id;
    Book.findById(id, (err, book) => {
        if (err) {
            console.log(err)
        } else {
            res.json(book)
        }
    })
});

bookRoutes.route('/add').post((req, res) => {
    //add a book to the db
    let book = new Book(req.body);
    book.save()
        .then(todo => {
            res.status(200).json({'book': 'book added successfully'})
        })
        .catch(err => {
            res.status(400).send('adding new book failed')
        })
});

bookRoutes.route('/update/:id').post((req, res) => {
    Book.findById(req.params.id, (err, book) => {
        if (!book) {
            res.status(404).send('Data was not found')
        } else {
            book.book_title = req.body.book_title;
            book.book_rating = req.body.book_rating;
            book.book_review = req.body.book_review;
            book.book_completed = req.body.book_completed;

            book.save().then(book => {
                res.json('Book Updated')
            })
            .catch(err => {
                res.status(400).send('Update did not go through');
            })
        }   
    })
});

bookRoutes.route('/delete/:id').delete((req, res) => {
    Book.findByIdAndDelete(req.params.id)
        .then(book => {
            console.log('deleted successfully')
        })
        .catch(err => {
            console.log('something went wrong')
        })
})


app.use('/books', bookRoutes);


app.listen(port, () => {
    console.log(`server started on port ${port}`);
})