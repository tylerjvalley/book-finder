const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');


// Load input validation
const validateSignUpInput = require('../../validation/signUp');
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require('../../models/User');

router.route('/sign-up').post((req, res) => {
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



router.route('/login').post((req, res) => {
    //Form Validation

    const { errors, isValid } = validateLoginInput(req.body)

    //check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username }).then(user => {
        //check if user exists
        if (!user) {
            return res.status(400).json({ username: 'Username not found' })
        }

        //check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                //User matched
                //create JWT payload
                const payload = {
                    id: user.id,
                    name: user.name
                };

                //Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res.status(400).json({ passwordincorrect: "Password Incorrect" });
            }
        });

    });
});

module.exports = router;