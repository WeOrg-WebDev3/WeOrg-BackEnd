const NewORg = require('../models/model.js');
const multer = require('multer');
const path = require('path');
const store = path.join(__dirname, '../../helpers');


module.exports.create = (req, res) => {
    const newOrg2 = new NewORg({
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        address: req.body.address,
        password: req.body.password,
        event: req.body.event,
        numEvent: req.body.numEvent,
        status: req.body.status,
        img: req.body.img
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
module.exports.findAll = (req, res) => {
    NewORg.find({})
        .then(organization => {
            res.send(organization);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error!"
            });
        });
};

module.exports.findOne = (req, res, name) => {
    NewORg.find({ name })
        .then(organization => {
            if (!organization) {
                return res.status(404).send({
                    message: "Can't find id: " + name
                });
            }
            res.send(organization);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Can't find id:" + id
                });
            }
            return res.status(500).send({
                message: "Error to retrieve " + id
            });
        });
};

module.exports.update = (req, res, id) => {
    NewORg.findByIdAndUpdate(id, {
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        address: req.body.address,
        password: req.body.password,
        event: req.body.event,
        numEvent: req.body.numEvent,
        status: req.body.status

    }, { new: true })
        .then(organization => {
            if (!organization) {
                return res.status(404).send({
                    message: "Can't find " + name
                });
            }
            res.send(organization);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Can't find " + name
                });
            }
            return res.status(500).send({
                message: "Error updating " + name
            });
        });
};

module.exports.delete = (req, res, name) => {
    name = req.body.name
    NewORg.findByIdAndRemove(id)
        .then(organization => {
            if (!organization) {
                return res.status(404).send({
                    message: "Can't find " + name
                });
            }
            res.send({ message: "Deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Can't find  " + name
                });
            }
            return res.status(500).send({
                message: "Can't find " + name
            });
        });
}



function findOrgOne(email) {
    return new Promise((resolve, reject) => {
        NewORg.findOne({ email: email }, (err, dbres) => {
            if (err) {
                reject(err);
            } else {
                resolve(dbres);
            }
        })
    })
}

module.exports = {
    findOrgOne
}