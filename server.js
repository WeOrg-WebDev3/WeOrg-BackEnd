const port = process.env.PORT || 8001;
const multer = require('multer');
const path = require('path');
const store = require('./helpers/storage.js');
const auth = require('./scripts/auth')


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const config = require('./scripts/config');
const account = require('./scripts/myController');
const quer = require('./scripts/Myinquery');
const dbConfig = 'mongodb://127.0.0.1:27017/WeOrg';
const db = mongoose.connection;
const action = require('./scripts/try');
const { User } = require('./models/model');


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use('/static', express.static(path.join(__dirname, 'public/uploads')))

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

let storeImg = (filename) => {
  var imgUrl = 'http://127.0.0.1:27017/WeOrg' + filename; //save this to db 
}

//SIGNIN
app.post('/account', (req, res) => {
  console.log(req)
  account.create(req, res);

});

app.post('/signup', (req, res) => {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  User.create({
    name: req.body.name,
    address: req.body.address,
    email: req.body.email,
    password: req.body.password,
    contact: req.body.contact,
    event: req.body.event,
    price: req.body.price,
    packages: req.body.packages
  },
  function (err, user) {
    if (err) return res.status(500).send("There was a problem registering the user.")
    // create a token
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
  }); 
});


app.post('/signin', (req, res) => {
  console.log(req)
  // account.login(req, res);
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    res.status(200).send(decoded);
  });
})

app.post('/query', (req, res) => {
  quer.create(req, res);
});


app.get('/query/retrieve', (req, res, err) => {
  const name = req.body.name;
  if (name) {
    quer.findOne(req, res, name);
  } else if (name == undefined) {
    quer.findAll(req, res);
  } else {
    err;
  }
})


app.put('/query/update/:name', (req, res) => {
  const name = req.params.name;
  quer.update(req, res, name)
})



app.delete('/query/delete/:name', (req, res) => {
  const name = req.params.name;
  quer.delete(req, res, name);
})



app.get('/retrieveOne/:name', (req, res) => {
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

app.get('/retrieveAll', (req, res) => {
  action.All().then(resp => {
    res.send(resp)
  }).catch(err => {
    res.send(err)
  })
})

app.get('/retrieveByAddress', (req, res) => {
  action.findOrgByAddress.then(resp => {
    res.send(resp)
  }).catch(err => {
    res.send(err)
  })
})

app.get('/retrieveByEvent', (req, res) => {
  action.findOrgByEvent.then(resp => {
    res.send(resp)
  }).catch(err => {
    res.send(err)
  })
})


app.put('/Update/:name', (req, res) => {
  const namei = req.params.name;
  action.Update(namei).then(resp => {
    res.send(resp)
  }).catch(err => {
    res.send(err)
  })
})

app.delete('/Delete/:name', (req, res) => {
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