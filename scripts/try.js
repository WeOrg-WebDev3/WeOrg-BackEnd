const NewORg = require('../models/model.js');
function findOrgOne(namei) {
    return new Promise((resolve, reject) => {
        NewORg.findOne({ name: namei }, (err, dbres) => {
            if (err) {
                reject(err);
            } else {
                resolve(dbres);
            }
        })
    })
}

function All() {
    return new Promise((resolve, reject) => {
        NewORg.find({}, (err, dbres) => {
            if (err) {
                reject(err);
            } else {
                resolve(dbres);
            }
        })
    })
}

function findOrgByAddress(addressi) {
    return new Promise((resolve, reject) => {
        NewORg.find({address: addressi}, (err, dbres) => {
            if(err) {
                reject(err);
            } else {
                resolve(dbres);
            }
        })
    })
}

function findOrgByEvent(eventi) {
    return new Promise((resolve, reject) => {
        NewORg.find({event: eventi}, (err, dbres) => {
            if(err) {
                reject(err);
            } else {
                resolve(dbres);
            }
        })
    })
}

function Update(namei) {
    return new Promise((resolve, reject) => {
        NewORg.updateOne({ name: namei }, (err, dbres) => {
            if (err) {
                reject(err);
            } else {
                resolve(dbres);
            }
        })
    })
}

function Delete(namei) {
    return new Promise((resolve, reject) => {
        NewORg.deleteOne({ name: namei }, (err, dbres) => {
            if (err) {
                reject(err);
            } else {
                resolve(dbres);
            }
        })
    })
}


function Login(emaili) {
    return new Promise((_resolve, reject) => {
        NewORg.findOne({ email: emaili }, (err, user) => {
            if (!user) reject(err)
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) return res.status(200).json({
                    message: "Succesfully log"
                });
                res.status(400).send("Email not found")
            })
        })
    })
}


module.exports = {
    findOrgOne,
    All,
    findOrgByAddress,
    findOrgByEvent,
    Update,
    Delete,
    Login
}
