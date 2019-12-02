const express = require('express');
const authRoute = new express.Router();
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./config');
// const account = require('./accountCreate');

authRoute.get('/sample', function (req, res) {
    res.send("hello world")
    const helper = require('./accountCreate')
    authRoute.post('/login', (req, res) => {
        let email = req.body.email
        helper.findOrgOne(email).then(resp => {
            //res.send(resp)
            if (resp != null) {
                //var match = bcrypt.hashSync(req.body.password, resp.password)
                var user = resp
                var match = false;
                if (req.body.password == resp.password) {
                    match = true
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
})

module.exports = authRoute