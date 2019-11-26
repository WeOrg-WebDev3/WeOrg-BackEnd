const port = 8000;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const account = require('./scripts/myController');
const quer = require('./scripts/Myinquery');
const dbConfig = 'mongodb://127.0.0.1:27017/WeOrg';
const db = mongoose.connection;
const action = require('./scripts/try');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig, { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
  console.log("Connected to dbs.");
}).catch(err => {
  console.log('Cannot connect to dbs.', err);
  process.exit();
});
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.post('/account', function (req, res) {
  console.log(req)
  account.create(req, res);
  
});


app.post('/query', function (req, res) {
  quer.create(req, res);
});

app.get('/query/retrieve', function (req, res, err) {
  const name = req.body.name;
  if (name) {
    quer.findOne(req, res, name);
  } else if (name == undefined) {
    quer.findAll(req, res);
  } else {
    err;
  }
})

app.put('/query/update/:name', function (req, res) {
  const name = req.params.name;
  quer.update(req, res, name)
})


app.delete('/query/delete/:name', function (req, res) {
  const name = req.params.name;
  quer.delete(req, res, name);
})

app.post('/retrieveOne/:name', function (req, res) {
  const namei = req.params.name;
  console.log(namei)
  if (namei != undefined) {
    action.findOrgOne(namei).then(resp => {
      res.send(resp)
    }).catch(err => {
      res.send(err)
    })
  }

})

app.post('/retrieveAll', function (req, res) {
  action.All().then(resp => {
    res.send(resp)
  }).catch(err => {
    res.send(err)
  })
})


app.put('/Update/:name', function (req, res) {
  const namei = req.params.name;
  action.Update(namei).then(resp => {
    res.send(resp)
  }).catch(err => {
    res.send(err)
  })
})

app.delete('/Delete/:name', function (req, res) {
  const namei = req.params.name;
  action.Delete(namei).then(resp => {
    res.send(resp)
  }).catch(err => {
    res.send(err)
  })
})


app.listen(port, () => {
  console.log("Server is listening on port " + port);
});