const port = process.env.PORT || 8001;
const multer = require('multer');
const store = require('./helpers/storage.js');
const auth = require('./scripts/auth')
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
const { User } = require('./scripts/model.js')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

var upload = multer({
  storage: store.storage
});


mongoose.Promise = global.Promise;
mongoose.connect(dbConfig, { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
  console.log("Connected to dbs.");
}).catch(err => {
  console.log('Cannot connect to dbs.', err);
  process.exit();
});
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//SIGNIN
app.post('/account', function (req, res) {
  account.create(req, res);
});


app.post('/signin',(req,res)=>{
  User.findOne({'email':req.body.email},(err,user)=>{
      if(!user) res.json({message:"Login failed, user not found"})

      user.comparePassword(req.body.password,(err,isMatch)=>{
          if(err) throw err;
          if(isMatch) return res.status(200).json({
              message: "Succesfully log"
          });
          res.status(400).send("Email not found")
      })
  })
})


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
  console.log(req.body)
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

app.use(auth)
app.listen(port, () => {
  console.log("Server is listening on port " + port);
});