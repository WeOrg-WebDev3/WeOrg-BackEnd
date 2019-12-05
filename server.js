const PORT = 8001;
const multer = require('multer');
const bcrypt = require('bcryptjs')

const store = require('./helpers/storage.js');
const auth = require('./scripts/auth')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
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
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/files', express.static(path.join(__dirname, 'public/uploads')))


mongoose.Promise = global.Promise;
mongoose.connect(dbConfig, { useNewUrlParser: true, useUnifiedTopology: true, createIndexes: true, useFindAndModify: false }
).then(() => {
    console.log("Connected to dbs.");
}).catch(err => {
    console.log('Cannot connect to dbs.', err);
    process.exit();
});
db.on('error', console.error.bind(console, 'MongoDB connection error:'));





// var ImageSchema = mongoose.Schema({
//   name: String,
//   src: String
// },{
//   collection:"images"
// });


// images
// compile schema to model
// var Image = mongoose.model('Image', ImageSchema, 'images'); //images is the collection

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        var filename = `uploads_${Math.round(+new Date() / 1000)}_${file.originalname}`
        console.log(filename);
        
        cb(null, filename)
    }
})

var upload = multer({ storage: storage, limits: { fileSize: 1000000000 } })


// note 'img' in upload is the key you use in FormData in frontend
//e.g : var data =  new FormData()
// data.append('img' ,uploadedFiles)

app.post('/uploadMultiple', upload.array('img'), (req, res, next) => {
    const imgs = req.files
    if (!imgs) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    } else {
        imgs.map(img => {
            let src = `${imgUrl}${img.filename}`; //save this to db  
            var new_img = new Image({ name: img.filename, src: src });
            // save model to database
            new_img.save(function (err, imgSaved) {
                if (err) return console.error(err);
                console.log(imgSaved.name + " saved to images collection.");
            });
            img.src = `http://localhost:${PORT}/static/uploads/${img.filename}`
        })
        res.send(imgs)
    }
})


app.post('/uploadSingle', upload.single('img'), (req, res, next) => {
    const img = req.files
    if (!img) {
        const error = new Error('Please select a file')
        error.httpStatusCode = 400
        return next(error)
    } else {
        // store(img.storage.filename)
        res.send("success")
    }
})

//SIGNIN


// for inquery actions
app.post('/query', function (req, res) {
    quer.create(req, res);
});

// for one inquery name
app.post('/retInquerybyOrgId/:', function (req, res) {
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
<<<<<<< HEAD
app.post('/account', upload.single('img'), function (req, res) {
    console.log(req.file.filename);
    
    var details = JSON.parse(req.body.details)
    let data = {
        name: details.name,
        address: details.address,
        email: details.email,
        password: details.password,
        contact: details.contact,
        event: details.event,
        price: details.price,
        packages: details.packages,
        img: req.file.filename
       
    }
    let user = new User(data);

    user.save()
        .then((doc) => {
            var token = jwt.sign({ id: doc.email }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token });
            res.end();
        })
        .catch(err => {

            res.status(500).send("There was a problem registering the user."+err)
        })
=======
app.post('/account', function (req, res) {
    account.create(req, res);

>>>>>>> 6e07db5a7b0d129d098d086e7887f5fb23934d0e
});



// Logging In
var userId;
app.post('/signin', (req, res) => {
<<<<<<< HEAD
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
                    password: doc.password,
                    
                }, config.secret, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                res.status(200).send({
                    auth: true,
                    token: token,
                    email: doc.email,
                    _id:doc._id,
                    message: 'Login successful'
                });
            } else {
                res.status(401).json({
                    message: 'No token provided'
                });
            }
        })
=======
    const emaili = req.body.email
    console.log(req.body)
    async function getEmail() {
        try {
            var result = await action.findEmailOne(emaili);
            bcrypt.compare(req.body.password, result[0].password, (err, user) => {
                console.log(user)
                if (user) {
                    userId = req.body._id;
                    var token = jwt.sign({
                        _id: result[0]._id,
                        name: result[0].name,
                        email: result[0].email,
                        password: result[0].password
                    }, config.secret, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    res.status(200).json({
                        auth: true,
                        token: token,
                        email: result[0].email,
                        id: result[0]._id,
                        message: 'login successful'
                    });
                } else {
                    res.status(200).json({
                        auth: false,
                        token: token,
                        email: result[0].email,
                        id: result[0]._id,
                        message: 'Invalid Inputs'
                    });

                }
            })
            // User.comparePa(req.body.password, (err, isMatch) => {
            //     if (err) throw err;
            //     if (isMatch) {
            //         userId = req.body._id;
            //         var token = jwt.sign({
            //             _id: result[0]._id,
            //             name: result[0].name,
            //             email: result[0].email,
            //             password: result[0].password
            //         }, config.secret, {
            //             expiresIn: 86400 // expires in 24 hours
            //         });
            //         res.status(200).send({
            //             auth: true,
            //             token: token,
            //             email: result[0].email,
            //             message: 'login successful'
            //         });
            //     }
            // })
        } catch (err) {
            res.status(400).json(err)
            console.log(err)
        }
    }
    getEmail();
>>>>>>> 6e07db5a7b0d129d098d086e7887f5fb23934d0e
})
// User.comparePa(req.body.password, (err, isMatch) => {
//     if (err) throw err;
//     if (isMatch) {
//         userId = req.body._id;
//         var token = jwt.sign({
//             _id: result[0]._id,
//             name: result[0].name,
//             email: result[0].email,
//             password: result[0].password
//         }, config.secret, {
//             expiresIn: 86400 // expires in 24 hours
//         });
//         res.status(200).send({
//             auth: true,
//             token: token,
//             email: result[0].email,
//             message: 'login successful'
//         });
//     }
// })

// console.log(req.body.email)
// const emaili = req.body.email
// User.findOne({'email':emaili},(err,user)=>{
//     if(!user) res.json({message:"Login failed, user not found"})

// user.comparePassword(req.body.password,(err,isMatch)=>{
//     if(err) throw err;
//     if (isMatch) {
//       userId = req.body._id;
//       var token = jwt.sign({
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//           password: user.password
//       }, config.secret, {
//           expiresIn: 86400 // expires in 24 hours
//       });
//       res.status(200).send({
//           auth: true,
//           token: token,
//           email: user,
//           message: 'login successful'
//       });
//   } 
//         res.status(400).send("Email not found")
//     })
// })
// })

// retrieve one data by event
app.get('/retrieveOneEvent/:event', function (req, res) {
    //console.log(req.body)
    const namei = req.params.event;
    // console.log(namei)
    async function getEvent() {
        try {
            var result = await action.findEventOne(namei);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json(err)
        }
    }
    getEvent();

})
//retrieve by id
app.post('/retriveprofile/:id', function (req, res) {
<<<<<<< HEAD
=======
    console.log('test')
>>>>>>> 6e07db5a7b0d129d098d086e7887f5fb23934d0e
    console.log(req.params.id, 'body')
    let namei = req.params.id;
    async function getId() {
        try {
            var result = await action.findIdOne(mongoose.Types.ObjectId(namei));
            res.status(200).json(result);
<<<<<<< HEAD
=======
            console.log(result.dbres[0], 'result')
>>>>>>> 6e07db5a7b0d129d098d086e7887f5fb23934d0e
        } catch (err) {
            res.status(400).send(err)
        }
    }
    getId();

})



//retireve for inquiries
app.post('/retriveinquiries/:id', function (req, res) {
    const iname = req.params.id;
    action.updateInquery(iname, req.body).then(resp => {
        res.send(resp)
    }).catch(err => {
        res.send(err)
    })

})
app.post('/retrivephoto/:id',upload.array('img'), function (req, res) {
    console.log(req.file.filename);
    const iname = req.params.id;
    console.log(req.body.id,"This is a  body")
    action.updatePhoto(iname, req.body.id).then(resp => {
        res.send(resp)
    }).catch(err => {
        res.send(err)
    })

})

// retrieve one data by name
app.post('/retrieveOne/:name', function (req, res) {
    const namei = req.params.name;
    console.log(req.body)
    if (namei != undefined) {
        action.updateInquery(namei).then(resp => {
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
app.put('/Update/:id', function (req, res) {
    console.log(req.params.id)
    const namei = req.params.id;
    action.Update(namei, req.body).then(resp => {
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
//retrieve by id
// app.get('/retriveprofile/', function (req, res) {
//   action.find({ _id: userId }, (err, user) => {
//     if (err) {
//       res.send(err);
//     }
//     res.json({ data: user });
//     //console.log(user)
//   });
// })Y

app.use(auth)
app.listen(PORT, () => {
    console.log(`server running at ${PORT}`);
})