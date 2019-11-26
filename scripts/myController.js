const NewORg = require('./model.js');


module.exports.create = (req, res) => {
    const newOrg2 = new NewORg({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        password: req.body.password,
        contact: req.body.contact,
        price: req.body.price,
        packages: req.body.packages,
        photo: req.body.photo
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








