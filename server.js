const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

const users = require('./routes/api/users')
const books = require('./routes/api/books');


// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);


//cors and bodyparser middleware
app.use(cors());
app.use(bodyParser.json());

//db config
const db = require('./config/keys').mongoURI;

//connect to mongoose
mongoose.connect(db, { useNewUrlParser: true } )
        .then(() => console.log('MongoDb successfully connected'))
        .catch(() => console.log(err));
  
const port = process.env.PORT || 5000;


//routes
app.use('/api/books', books);
app.use('/api/users', users);


app.listen(port, () => {
    console.log(`server started on port ${port}`);
})