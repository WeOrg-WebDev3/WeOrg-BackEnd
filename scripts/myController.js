const NewORg = require('./model.js');

module.exports.create = (req, res) => {

    const newOrg2 = new NewORg({
        username: req.body.username,
        email: req.body.email,
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
};


