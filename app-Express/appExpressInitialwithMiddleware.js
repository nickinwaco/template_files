/*
necessary express for new application

*/


// #1 import express libary
import express from 'express';


// #2  set up the App
const app = express();

// #6 USE from Express--- send it middleware; 3 arguments
app.use((err, request, response, next) => {
  console.log('Middleware is running');
  next();  // this is important to define
});



// #3 is at the bottom of the page

// #5
app.get('/recipes', (request, response, next) => {
  console.log('called Recipes');
  return response.json({
    message:  'This Works'
  });
});
// NOTE:  you can test via Postman

// #8 example route for Error handling
app.get('/falseroute', (request, response, next) => {
  console.log('falseroute');
  const error = new Error('this is my first error');
  return next(error);
});


// #7 Error handling from Expresswith APP---
//    when you use 4 arguments it's an Error Middleware
app.use((err, request, response, next) => {
  console.log('Error handler Middleware is working: ');
  return resposne.status(500).json({
    message: err.message
  });
});




// #3 setup the port for Express to listen on
const PORT = 3000;

// #4 create the Listener at the bottom of the page
app.listen(PORT, (err) => {
  if (err) {
    console.log('Something went wrong. ', err);
  }
  console.log('Server is running on port: ', PORT);
});
// NOTE:  you can test via Postman if it's listening
