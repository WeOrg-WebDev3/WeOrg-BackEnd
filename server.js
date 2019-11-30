const port = process.env.PORT || 8001;
const multer = require('multer');
const store = require('./helpers/storage.js');
const auth = require('./scripts/auth')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const account = require('./scripts/accountCreate');
const quer = require('./scripts/inqueryCreate');
const dbConfig = 'mongodb://127.0.0.1:27017/WeOrg';
const db = mongoose.connection;
const action = require('./scripts/accountFunction');
const inqueraction = require('./scripts/inqueryFunction');
const jwt = require('jsonwebtoken');
const config = require('./scripts/config');
const { User } = require('./scripts/accountModel.js')
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


// for inquery actions
app.post('/query', function (req, res) {
  quer.create(req, res);
});

// for one inquery name
app.post('/retInquerybyName/:name', function (req, res) {
  const namei = req.params.name;
  console.log(namei)
  if (namei != undefined) {
    inqueraction.findOrgOne(namei).then(resp => {
      res.send(resp)
    }).catch(err => {
      res.send(err)
    })
  }

})


// for All inquery from clients
app.post('/retrieveAllInquery', function (req, res) {
  console.log(req.body)
  inqueraction.All().then(resp => {
    res.send(resp)
  }).catch(err => {
    res.send(err)
  })
})

// update one query by client
app.put('/UpdateOneInquery/:name', function (req, res) {
  const namei = req.params.name;
  inqueraction.Update(namei).then(resp => {
    res.send(resp)
  }).catch(err => {
    res.send(err)
  })
})

// delete query by client;s name
app.delete('/DeleteOneInquerbyName/:name', function (req, res) {
  const namei = req.params.name;
  inqueraction.Delete(namei).then(resp => {
    res.send(resp)
  }).catch(err => {
    res.send(err)
  })
})



// for Account

// creating Account
app.post('/account', function (req, res) {
  account.create(req, res);
});

// Logging In
app.post('/signin',(req,res)=>{
  User.findOne({'email':req.body.email},(err,user)=>{
      if(!user) res.json({message:"Login failed, user not found"})

      user.comparePassword(req.body.password,(err,isMatch)=>{
          if(err) throw err;
          if (isMatch) {
            var token = jwt.sign({
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password
            }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({
                auth: true,
                token: token,
                email: user,
                message: 'login successful'
            });
        } 
          res.status(400).send("Email not found")
      })
  })
})

// retrieve one data by event
app.post('/retrieveOne/:name', function (req, res) {
  const namei = req.params.event;
  console.log(namei)
  if (namei != undefined) {
    action.findEventOne(namei).then(resp => {
      res.send(resp)
    }).catch(err => {
      res.send(err)
    })
  }

})

// retrieve one data by name
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

// retrieve all organizer info
app.post('/retrieveAll', function (req, res) {
  console.log(req.body)
  action.All().then(resp => {
    res.send(resp)
  }).catch(err => {
    res.send(err)
  })
})

// updating organazer's profile by name
app.put('/Update/:name', function (req, res) {
  const namei = req.params.name;
  action.Update(namei).then(resp => {
    res.send(resp)
  }).catch(err => {
    res.send(err)
  })
})


// deleting ogranizer's data by name
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