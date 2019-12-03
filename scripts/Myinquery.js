const query = require('../models/inquery');

module.exports.create = (req, res) => {
    const inquired = new query({
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        address: req.body.address,
        event: req.body.event,
        message:req.body.message
    });

    inquired.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error!"
            });
        });

}


let retrieve = (req,res) =>{
    NewORg.findAll((err,data)=>{
        if(err){
            res.send(err);
        }res.send(data)
    })
}
   
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
  

  module.exports.update = (req, res, name) => {
    query.findByIdAndUpdate(name, {
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        address: req.body.address,
        password: req.body.password,
        event: req.body.event,
        numEvent: req.body.numEvent,
        status: req.body.status
    }, { new: true })
        .then(quer => {
            if (!quer) {
                return res.status(404).send({
                    message: "Can't find " + name
                });
            }
            res.send(quer);
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

module.exports.findOne = (req, res, name) => {
    query.findOne({name})
            .then(quer => {
                if (!quer) {
                    return res.status(404).send({
                        message: "Can't find id: " + name
                    });
                }
                res.send(quer);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Can't find id:" + name
                    });
                }
                return res.status(500).send({
                    message: "Error to retrieve " + name
                });
            });
    };

    module.exports = {retrieve}