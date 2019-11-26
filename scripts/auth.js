const express = require('express');
const authRoute = new express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./config');
const account = require('./myController');

authRoute.get('/sample', function (req, res) {
    res.send("hello world")
})
// authRoute.route('/login').post(function (req, res) {
//     console.log("dsghfdg")
//     getResult();
//     async function getResult() {
//         try {
//             var user = await account.findOne(req.body.name);
//             console.log(user)
//             if (user != 'not found') {
//                 bcrypt.compare(req.body.password, user.data.password)
//                     .then(match => {
//                         if (match) {
//                             var token = jwt.sign({
//                                 _id: user._id,
//                                 email: user.email,
//                             }, config.secret, {
//                                 expiresIn: 86400 // expires in 24 hours
//                             });
//     res.status(200).send({
//         auth: true,
//         token: token,
//         email: user.email,
//         message: 'login successful'
//     });
// } else {
//     res.status(401).json({
//         message: 'Wrong password'
//     });
// }
//                     })
//                     .catch(err => {
//                         if (err) {
//                             console.log(err);
//                             res.status(400).json(err);
//                         }
//                     });
//             } else if (user.data == 'not found') {
//                 res.status(404).json({
//                     message: 'user not found!'
//                 });
//             }
//         } catch (err) {
//             res.status(500).json({
//                 message: err.message

//             });
//         }
//     }
// });


// authRoute.route('/userInfo').post((req, res) => {
//   var user = jwt.decode(req.body.data);
//   console.log(user)
//   getResult();
//   async function getResult() {
//     try {
//       var result = await account.findOrg(user._id);
//       if (result.data != 'not found' || result.data == undefined) {
//         res.status(200).json({
//           data: result.data
//         });
//       } else {
//         res.status(400).json({
//           message: 'User not found!'
//         });
//       }
//     } catch (err) {
//       res.status(500).json({
//         message: 'Unexpected error occured!'
//       });
//     }
//   }
// });

// authRoute.route('/userType').post((req, res) => {
//   console.log(req.body.event);
//   var user = jwt.decode(req.body.event);
//   console.log(user);
//   var event = user.event;  //what event he/she organizes
//   res.status(200).json({
//     eventType: event
//   });
// });

// var tempdata = {
//   username: '',
//   password: ''
// };

// authRoute.route('/signup').post((req, res) => {
//   tempdata = req.body;
//   res.status(200).end();
// });

// authRoute.route('/signedup').get((req, res) => {
//   res.status(200).json(tempdata);
// });
const helper = require('./myController')
authRoute.post('/login', (req, res) => {
    let email = req.body.email
    helper.findOrgOne(email).then(resp => {
        //res.send(resp)
        if (resp != null) {
            //var match = bcrypt.hashSync(req.body.password, resp.password)
            var user = resp
            var match = false;
            if(req.body.password==resp.password){
                match =true
            }
            if (match) {
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
            } else {
                res.status(401).json({
                    message: 'Wrong password'
                });
            }
        }

    })
})
module.exports = authRoute;