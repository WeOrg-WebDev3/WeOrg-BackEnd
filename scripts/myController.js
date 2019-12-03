const NewORg = require('../models/model.js');
const multer = require('multer');
const path = require('path');
const store = path.join(__dirname, '../../helpers');


module.exports.create = (req, res) => {
    const newOrg2 = new NewORg({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        password: req.body.password,
        contact: req.body.contact,
        event: req.body.event,
        price: req.body.price,
        packages: req.body.packages,
        img: req.body.filename
    });

    newOrg2.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error!"
            });
        });

}

module.exports.login = (req, res) => {
    NewORg.findOne({ 'email': req.body.email }, (err, user) => {
        if (!user) res.json({ message: "Login failed, user not found" })

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) return res.status(200).json({
                message: "Succesfully log"
            });
            res.status(400).send("Email not found")
        })
    })
}








