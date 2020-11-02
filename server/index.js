const express = require('express');
const path = require('path');

const app = express();
const dev = true;

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/out')));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req, res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log('Sent list of items');
});

// Handles any requests that don't match the ones above
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/out/index.html'));
});

// Static files
// https://github.com/zeit/next.js/tree/4.2.3#user-content-static-file-serving-eg-images
app.use(
  '/_next',
  express.static(
    path.join(__dirname, '../client/out/_next'),
    { maxAge: dev ? '0' : '365d' }
  )
);

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port http://localhost:' + port);
