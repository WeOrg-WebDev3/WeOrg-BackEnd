const NewORg = require('./model.js');


module.exports.create = (req, res) => {
    const newOrg2 = new NewORg({
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        address: req.body.address,
        password:req.body.password,
        event: req.body.event,
        numEvent: req.body.numEvent,
        status: req.body.status
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








