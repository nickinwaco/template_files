/*
Passport.js is a libary
http://passportjs.org/


they all the popular sites with examples included


DEPENDENCIES
npm uninstall bcrypt
npm install bcrypt-nodejs --save

*/

/*
there are multiple files.
1.  secret file ----not to be uploaded to github or kept in Public
*/


// #2.  create the envirotment
import bcrypt from 'bcrypt-nodejs';
// const bcrypt = require(bcrypt-nodejs);  <--  ES5 way

// #3  "Salt" or "hash" the secret aka Password
bcrypt.genSalt(10, function(salt) {
  bcrypt.hash(password, salt, null, function(err, hashedPassword) {
    // Function body
  });
});


// src/services/passport.js
onst bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/UserModel');
const LocalStrategy = require('passport-local');

const signinStrategy = new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username }).exec()
    .then(user => {
      // If there is no user found call done with a `null` argument, signifying no error
      // and `false` signifying that the signin failed
      if (!user) {
        return done(null, false);
      }

      bcrypt.compare(password, user.password, function(err, isMatch) {
        // If there is an error call done with our error
        if (err) {
          return done(err, false);
        }

        // If the passwords do not match call done with a `null` argument, signifying no error
        // and `false` signifying that the signin failed
        if (!isMatch) {
          return done(null, false);
        }

        // If we have no errors and the passwords match
        // call done with a `null` argument, signifying no error
        // and with the now signed in user
        return done(null, user);
      });
    })
    .catch(err => done(err, false));
});

// Tell passport to use this strategy
passport.use('signinStrategy', signinStrategy);
