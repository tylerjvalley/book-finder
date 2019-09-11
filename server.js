const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');

//models
const users = require('./routes/api/users');
const books = require('./routes/api/books');

const app = express();



//cors and bodyparser middleware
const cors = require('cors');
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(bodyParser.json());

mongoose.set('useFindAndModify', false);
//db config
const db = require('./config/keys').mongoURI;

//connect to mongoose
mongoose.connect(db, { useNewUrlParser: true } )
        .then(() => console.log('MongoDb successfully connected'))
        .catch((err) => console.log('MongoDB error:', err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);
  



//routes
app.use('/api/books', books);
app.use('/api/users', users);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server started on port ${port}`);
})



