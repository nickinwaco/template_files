/*
necessary express for new application

*/


// #1 import express libary
import express from 'express';


// #2  set up the App
const app = express();

// #3 is at the bottom of the page

// #5
app.get('/recipes', (request, response, next) => {
  console.log('called Recipes');
  return response.json({
    message:  'This Works'
  });
});
// NOTE:  you can test via Postman


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
