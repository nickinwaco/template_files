/*
authentication Router
/src/routes/AusthenticationRoutes.js


DEPENDENCIES

*/

// #1 Get all the requires
import express from 'express';
import Router from 'express.router';
import User from '../models/UserModel';
import bcrypt from 'bcrypt-nodejs';
import passport from 'passport';


// #3 Require our custom strategies.  This is an import of our
//    Passport.js file which contains the Secrt + Hashing algorithm.
require('../services/passport');

// #4 create variable for passing around
const signinStrategy = passport.authenticate('signinStrategy', { session: false });

// #5  sends the user to a page for processing
router.post('/api/signin', signinStrategy, function(req, res, next) {
  res.json({ message: `You've been authenticated!`});
});

// #6 sends the user to a page for signup if Auth fails
router.post('/signup', function(req, res, next) {
  // SEE ABOVE SNIPPET FOR THE CODE THAT GOES HERE
});

//#2
module.exports = router;
