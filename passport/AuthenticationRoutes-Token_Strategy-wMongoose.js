/*
authentication Router
/src/routes/AusthenticationRoutes.js

For MONGOOSE integration


DEPENDENCIES
JWT
dotenv

*/

// #1 Get all the requires
import express from 'express';
import bodyParser from 'bodyParser';
import mongoose from 'mongoose';
import Router from 'express.router';
// import jwt from 'jwt-simple';
// import User from '../models/UserModel';
// import bcrypt from 'bcrypt-nodejs';
// import passport from 'passport';
import {Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
// or  import {Strategy as MyStrategy, ExtractJwt } from 'passport-jwt';
// or  import {Strategy as FacebookStrategy } from passport-facebook;


// #3 Require our custom strategies.  This is an import of our
//    Passport.js file which contains the Secrt + Hashing algorithm.
require('../services/passport');


// ###### goes into top level file like index.js #################
// #30 IMPORTANT ENVIRONMENT
require('dotenv').config();  //<---- goes in top level file

// #31
const port = proces.env.PORT || 3001; //  <--- goes right about the "listen line"
// ###########################################



// #4 create variable for passing around
const signinStrategy = passport.authenticate('signinStrategy', { session: false });

// #5 Helper method to create a token for a user
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ userId: user.id, iat: timestamp }, 'abc123');
}

// #6  sends the user to a page for processing
router.post('/api/signin', signinStrategy, function(req, res, next) {
  res.json({ token: tokenForUser(req.user)});
});

// #7 sends the user to a page for signup if Auth fails
router.post('/signup', function(req, res, next) {
  // SEE ABOVE SNIPPET FOR THE CODE THAT GOES HERE
  const {username, password } = req.body;
});


// #8 If no username or password was supplied return an error
  if (!username || !password) {
    return res.status(422)
      .json({ error: 'You must provide an username and password' });
  }

// #9 Look for a user with the current user name
  User.findOne({ username }).exec()
    .then((existingUser) => {
      // If the user exist return an error on sign up
      if (existingUser) {
        return res.status(422).json({ error: 'Username is in use' });
      }

      // If the user does not exist create the user
      // User bcrypt to has their password, remember, we never save plain text passwords!
      bcrypt.hash(password, 10, function(err, hashedPassword) {
        if (err) {
          return next(err);
        }

        // Create a new user with the supplied username, and the hashed password
        const user = new User({ username, password: hashedPassword });

        // Save and return the user
        user.save()
          .then(user => res.json({ token: tokenForUser(user) }));
      });
    })
    .catch(err => next(err));
});

// #2  export the module
module.exports = router;
