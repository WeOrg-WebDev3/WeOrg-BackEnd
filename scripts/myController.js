const NewORg = require('./model.js');

module.exports.create = (req, res) => {
    const newOrg2 = new NewORg({
        name: req.body.name,
        email: req.body.email,
        contact:req.body.contact,
        address: req.body.address,
        password: req.body.password
    });

    newOrg2.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error!"
            });
        });


        exports.findAll = (req, res) => {
            NewORg.find()
                .then(organization => {
                    res.send(organization);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Error!"
                    });
                });
        };
        
        
        exports.findOne = (req, res, id) => {
            NewORg.findByIdAndUpdate(id)
                .then(organization => {
                    if (!organization) {
                        return res.status(404).send({
                            message: "Can't find id: " + id
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
        
        exports.update = (req, res, id) => {
             NewORg.findByIdAndUpdate(id, {
                name: req.body.name,
                email: req.body.email,
                contact: req.body.contact,
                address: req.body.address,
                password:req.body.password
            }, { new: true })
                .then(organization => {
                    if (!organization) {
                        return res.status(404).send({
                            message: "Can't find " + id
                        });
                    }
                    res.send(organization);
                }).catch( err => {
                    if (err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "Can't find " + id
                        });
                    }
                    return res.status(500).send({
                        message: "Error updating " + id
                    });
                });  
        };
        
        exports.delete = (req, res, id) => {
            NewORg.findByIdAndRemove(id)
                .then(organization => {
                    if (!organization) {
                        return res.status(404).send({
                            message: "Can't find " + id
                        });
                    }
                    res.send({ message: "Deleted successfully!" });
                }).catch(err => {
                    if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                        return res.status(404).send({
                            message: "Can't find  " + id
                        });
                    }
                    return res.status(500).send({
                        message: "Can't find " + id
                    });
                });
            }
};


