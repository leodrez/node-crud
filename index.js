const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
const ObjectId = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');

const url = 'mongodb://localhost:27017/nodepractice';

app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  MongoClient.connect(url, (err, db) => {
    assert.equal(null, err);
    if (err) res.status(500);

    db.collection('userdata').find({}).toArray((err, docs) => {
      assert.equal(null, err);
      res.render('data', {
        data: docs
      });
    });
    
    db.close();
  });
});

app.get('/submit', (req, res) => {
  res.render(__dirname + '/views/home.handlebars');
});

app.post('/submit', (req, res) => {
  let data = {
    name: req.body.name,
    email: req.body.email,
    topic: req.body.topic,
    message: req.body.message
  };
    
  MongoClient.connect(url, (err, db) => {
    assert.equal(null, err);
    if (err) res.status(500);

    db.collection('userdata').insertOne(data, (err, result) => {
      assert.equal(null, err);
      res.send(data);
    });

    db.close();
  });
});

app.put('/data/:id', (req, res) => {
  let data = {
    name: req.body.name,
    email: req.body.email,
    topic: req.body.topic,
    message: req.body.message,
  };

  let id = req.params.id

  MongoClient.connect(url, (err, db) => {
    assert.equal(null, err);
    if (err) res.status(500);

    db.collection('userdata').updateOne({'_id': ObjectId(id)}, {$set: data}, ((err, result) => {
      assert.equal(null, err);
      res.send(data);
    }));

    db.close();
  });
});

app.delete('/data/:id', (req, res) => {
  let id = req.params.id

  MongoClient.connect(url, (err, db) => {
    assert.equal(null, err);
    if (err) res.status(500);

    db.collection('userdata').deleteOne({'_id': ObjectId(id)}, ((err, result) => {
      assert.equal(null, err);
      res.send({ message: 'Deleted successfully' });
    }));

    db.close();
  });
  
});

app.listen(3000, () => { console.log('App listening on port 3000'); });

