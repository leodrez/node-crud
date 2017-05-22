const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
const bodyParser = require('body-parser');

const url = 'mongodb://localhost:27017/nodepractice';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/submit', (req, res) => {
  res.sendFile(__dirname + '/views/submit.html');
});

app.get('/form', (req, res) => {
});

app.get('/data', (req, res) => {
  MongoClient.connect(url, (err, db) => {
    assert.equal(null, err);
    if (err) res.status(500);

    db.collection('userdata').find({}).toArray((err, docs) => {
      assert.equal(null, err);
      res.send(docs);
    });
    
    db.close();
  });
});

app.post('/form', (req, res) => {
  MongoClient.connect(url, (err, db) => {
    assert.equal(null, err);
    console.log('Connected to db');

    let data = {
      name: req.body.name,
      email: req.body.email,
      topic: req.body.topic,
      message: req.body.message
    };
    
    db.collection('userdata').insertOne(data, (err, result) => {
      assert.equal(null, err);
      res.send(data);
    });

    db.close();
  });
});

app.put('/form', (req, res) => {
  MongoClient.connect(url, (err, db) => {
    assert.equal(null, err);
    console.log('Connected to db');

    db.close();
    //res.redirect('/update');
  });
});

app.delete('/', (req, res) => {});

app.listen(3000, () => { console.log('App listening on port 3000'); });

