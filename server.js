const port = 8000;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const item = require('./scripts/myController');
const path = require('path');
app.use(express.static('views'));


app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.all('/', function (req, res) {
  res.sendFile(path.join(__dirname, './index.html'));
});

const dbConfig = 'mongodb://127.0.0.1:27017/dbItems';
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig, { useNewUrlParser: true, useUnifiedTopology: true }
  ).then(() => {
    console.log("Connected to dbs.");    
}).catch(err => {
    console.log('Cannot connect to dbs.', err);
    process.exit();
});


app.post('/item/create', function (req,res) {
  item.create(req,res);
});


app.get('/item/retrieve/all', function (req,res) {
  item.findAll(req,res);
})


app.get('/item/retrieve/:id', function (req,res) {
  let id = req.params.id;
  item.findOne(req,res,id);
})


app.listen(port, () => {
  console.log("Server is listening on port " + port);
});