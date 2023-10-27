const express = require('express');
require('express-async-errors');
const app = express();

// import routers
const dogRouter = require('./routes/dogs');

// connect express.json middleware
app.use(express.json());

// connect express.static middleware, serve through /static url
app.use('/static', express.static('assets'));

app.use('/dogs', dogRouter);

// logger middleware
//    log method
//    log path of requests to terminal
//    log status code of response
app.use((req, res, next) => {
  let method = req.method;
  let url = req.url;
  console.log(method);
  console.log(url);
  next();

  // status code event listener
  res.on('finish', () => {
    console.log(res.statusCode);
  });

});


// For testing purposes, GET /
app.get('/', (req, res) => {
  res.json("Express server running. No content provided at root level. Please use another route.");
});

// For testing express.json middleware
app.post('/test-json', (req, res, next) => {
  // send the body as JSON with a Content-Type header of "application/json"
  // finishes the response, res.end()
  res.json(req.body);
  next();
});

// For testing express-async-errors
app.get('/test-error', async (req, res) => {
  throw new Error("Hello World!")
});

app.use((req, res) => {
  let error = new Error(`The requested resource couldn't be found.`);
  error.statusCode = (404);
  throw error;
})

const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));