const port = process.env.PORT || 8000;
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer')
const store = require('./helpers/storage');
const app = express();
const mongoose = require('mongoose');
const account = require('./scripts/myController');
const quer = require('./models/Myinquery');
const dbConfig = 'mongodb://127.0.0.1:27017/WeOrg';
const db = mongoose.connection
const auth = require('./scripts/auth')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var upload = multer({
  storage: store.storage
});

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true }
).then(() => {
  console.log("Connected to dbs.");
}).catch(err => {
  console.log('Cannot connect to dbs.', err);
  process.exit();
});
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.post('/account', function (req, res) {
  account.create(req, res);
});

app.post('/query', function (req, res) {
  quer.create(req, res);
});

app.post('/addImage', upload.single('img'), (req, res, next) => {
  console.log(req.body)
  let data = {
    img: req.file.filename
  };
  let entry = new Entry(data);

  entry.save()
    .then(() => {
      res.json({ message: "Successful!" });
      console.log('saved')
    }).catch((err) => {
      res.status(400).json({ err: err.message })
    });
});


app.get('/query/retrieveAll', function (req, res) {
  quer.findAll(req, res);
})

app.get('/accounts/retrieve', function (req, res, err) {
  const name = req.body.name;
  if (name) {
    account.findOne(req, res, name);
  } else if (name == undefined) {
    account.findAll(req, res);
  } else {
    err;
  }
})


app.put('/account/update/:name', function (req, res) {
  const name = req.params.name;
  account.update(req, res, name)
})


app.delete('/account/delete/:name', function (req, res) {
  const name = req.params.name;
  account.delete(req, res, name);
})

app.use(auth)
app.listen(port, () => {
  console.log("Server is listening on port " + port);
});