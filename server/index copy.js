const express = require('express');
const path = require('path');
const app = express();

// Serve the static files
// https://github.com/vercel/next.js/discussions/14532
app.use(express.static(path.join(__dirname, '../client/public')))
app.use('/_next', express.static(path.join(__dirname, '../client/out/_next')));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req, res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log('Sent list of items');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/out/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port http://localhost:' + port);
