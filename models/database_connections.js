/*
Database connections

'Setup for Mongoose - Past the code below in root file such as

App.js or Index.js
'

Dependencies
mongoose
*/

//import needed files

// #1 to get mongoose libarary
import mongoose from 'mongoose';

// #2 to get Schema for DB
import Users from './models/users'


// #3 DB connection
mongoose.connect('mongodb://localhost/XXX Table Name XXXXX');

// #4 define a db vaarible for mongoose operations
const db = mongoose.connection;

// #5 error control & open handling
db.on('error', console.error.bind(console, 'connection error');
db.once('open', function(){
  console.log('MongoDb connected');
});
