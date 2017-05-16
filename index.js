const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb').MongoClient
  , assert = require('assert');
const app = express();

app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const url = 'mongodb://localhost:27017/nodecrud'; 

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/', (req, res, next) => {
  let resultArray = [];
  mongo.connect(url, (err, db) => {
    assert.equal(null, err);
    
    let cursor = db.collection('data').find();

    cursor.forEach((doc, err) => {
      assert.equal(null, err); 
      resultArray.push(doc);
    }, () => {
      db.close();
    });
  });
});

app.post('/', (req, res, next) => {
  let item = {
    name: req.body.name,
    email: req.body.email,
    topic: req.body.topic,
    message: req.body.message
  };

  mongo.connect(url, (err, db) => {
    assert.equal(null, err);
    db.collection('data').insertOne(item, (err, data) => {
      assert.equal(null, err);
      console.log('Item inserted');
      
      db.close();
    });
  });  

  res.redirect('/');
});

app.put('/', (req, res) => {
});

app.delete('/', (req, res) => {
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
