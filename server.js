const port = 8002;
const multer = require('multer');
const path = require('path');
const store = require('./helpers/storage.js');
const auth = require('./scripts/auth');
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
const Image = require('./models/imageModel');


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
// app.post('/account', (req, res) => {
//   console.log(req)
//   account.create(req, res);

// });

app.post('/account', upload.single('img'), (req, res) => {
  let data = {
    name: req.body.name,
    address: req.body.address,
    email: req.body.email,
    password: req.body.password,
    contact: req.body.contact,
    event: req.body.event,
    price: req.body.price,
    packages: req.body.packages,
    img: req.file.filename
  }
  let user = new User(data);
  user.save()
    .then((doc) => {
      var token = jwt.sign({ id: doc.email}, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
      res.end();
    })
    .catch(err => {
      res.status(500).send("There was a problem registering the user.")
    })
});

app.post('/signin', (req, res) => {
  console.log(req.body)
  // account.login(req, res);
  var token = req.headers['x-access-token'];
  var match = false;
  User.findOne({ email: req.body.email })
    .then(doc => {
      console.log(doc)
      if (bcrypt.compareSync(req.body.password, doc.password)) {
        match = true;
      } else {
        match = false
      }
      if (match) {
        var token = jwt.sign({
          _id: doc._id,
          name: doc.name,
          email: doc.email,
          password: doc.password
        }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({
          auth: true,
          token: token,
          email: doc.email,
          message: 'Login successful'
        });
      } else {
        res.status(401).json({
          message: 'No token provided'
        });
      }
    })
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

// app.post('/uploadImg', upload.single('img'),(req, res)=>{
//   console.log(req.file.filename,'filename')
//   console.log(req.body,'body')
//   let token = jwt.decode(token)
//   // token._id
//   let data = {

//   }
//   let image =  new Image()

// })

// app.post('/addImage', upload.single('img'), (req, res, next) => {
//   console.log(req.body)
//   let data = {
//     img: req.file.filename
//   };
//   let entry = new Entry(data);

//   entry.save()
//     .then(() => {
//       res.json({ message: "Successful!" });
//       console.log('saved')
//     }).catch((err) => {
//       res.status(400).json({ err: err.message })
//     });
// });

app.post('/addMultiple', upload.array('img', 10), (req, res, next) => {
  const imgs = req.files
  if (!imgs) {
    const error = new Error('Please upload a file!')
    error.httpStatusCode = 400
    return next(error)
  } else {
    imgs.map(img => {
      store(img.filename)
    })
    res.send("success")
  }
})



app.use(auth)
app.listen(port, () => {
  console.log("Server is listening on port " + port);
});