const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname +  '/index.html');
});

app.post('/', (req, res) => {
  console.log('Hey');
});

app.listen(3000, (() => console.log('Listening on port 3000')));
