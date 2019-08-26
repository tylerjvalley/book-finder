const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
 

// Load input validation
const validateSignUpInput = require('../../validation/signUp');
const validateLoginInput = require('../../validation/login');

// Load User model and 
const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

router.post('/sign-up', (req, res) => {
    //Form Validation

    const { errors, isValid } = validateSignUpInput(req.body)

    //check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ username: req.body.username }).then(user => {
        if (user) {
            return res.status(400).json({ username: 'Username already exists' })
        } else {
            const newUser = new User({
                username: req.body.username,
                firstName: req.body.firstName,
                password: req.body.password
            });

            //Hash Password before entering into database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

 



router.post('/login', (req, res) => {
    //Form Validation
    
    const { errors, isValid } = validateLoginInput(req.body)

    //check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ username: req.body.username }).then(user => {

         //find User 
        if (user) {

           //compare password
           if (bcrypt.compareSync(req.body.password, user.password)) {
               //passwords match 
               const userSession = new UserSession();

               userSession.userId = user._id;
               userSession.save((err, doc) => {
                   if (err) {
                       return res.send({
                           success: false,
                           message: 'Error: server error'
                       });
                   }

                   return res.send({
                       success: true,
                       message: 'Valid login',
                       token: doc._id
                   });
               });
           } else {
               return res.status(400).json({ password: 'Password incorrect' })
           }
        } else {
            return res.status(400).json({ username: 'Username not found' })
        }
    });
   
    
});

/*
       
       */





module.exports = router;