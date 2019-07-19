const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/api/books', (req, res) => {
    const books = [
        /* put data here? */
        {id: 1, book: 'Harry Potter'},
        { id: 2, book: 'Bible' },
        { id: 3, book: 'Qaran' },
        { id: 4, book: 'The Outsiders' }
        
    ];

    res.json(books);
});

const port = 5000;

app.listen(port, () => {
    console.log(`server started on port ${port}`);
})