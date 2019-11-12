const port = 8000;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const account = require('./scripts/myController');

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())


const dbConfig = 'mongodb://127.0.0.1:27017/WeOrg';
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig, { useNewUrlParser: true, useUnifiedTopology: true }
  ).then(() => {
    console.log("Connected to dbs.");    
}).catch(err => {
    console.log('Cannot connect to dbs.', err);
    process.exit();
});
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.post('/account', function (req,res) {
  account.create(req,res);
});


app.get('/accounts/retrieveAll', function (req,res) {
  account.findAll(req,res);
})


app.get('/account/retrieve/:id', function (req,res) {
  let id = req.params.id;
  account.findOne(req,res,id);
})



app.put('/account/update/:id',function (req,res) {
  let id = req.params.id;
  account.update(req,res,id)
})


app.delete('/account/delete/:id', function (req,res) {
  let id = req.params.id;
  account.delete(req,res,id);
})


app.listen(port, () => {
  console.log("Server is listening on port " + port);
});