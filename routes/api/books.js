const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');




const Book = require('../../models/Book');

router.get('/my-books', (req, res) => {
    Book.find((err, books) => {
        if (err) {
            console.log(err)
        } else {
            res.json(books)
        }
    });
});



router.get('/:id', (req, res) => {
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


router.post('/add-book', (req, res) => {
    //add a book to the db
    let book = new Book(req.body);
    book.save()
        .then(todo => {
            res.status(200).json({ 'book': 'book added successfully' })
        })
        .catch(err => {
            res.status(400).send('adding new book failed')
        })
});

router.put('/update/:id', (req, res) => {
    Book.findById(req.params.id, (err, book) => {
        if (!book) {
            res.status(404).send('Data was not found')
        } else {
            book.book_rating = req.body.book_rating;
            book.book_review = req.body.book_review;
            book.book_in_progress = req.body.book_in_progress;
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

router.delete('/delete/:id', (req, res) => {
    Book.findByIdAndDelete(req.params.id)
        .then(book => {
            console.log('deleted successfully')
        })
        .catch(err => {
            console.log('something went wrong')
        })
})


module.exports = router;