const {User} = require('./accountModel.js');
// const NewORg = require('./accountCreate.js');
function findOrgOne(namei) {
    return new Promise((resolve, reject) => {
        User.findOne({ name: namei }, (err, dbres) => {
            if (err) {
                reject(err);
            } else {
                resolve(dbres);
            }
        })
    })
}


function findEventOne(namei) {
    return new Promise((resolve, reject) => {
        User.find({ event: namei }, (err, dbres) => {
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
        User.find({}, (err, dbres) => {
            if (err) {
                reject(err);
            } else {
                resolve(dbres);
            }
        })
    })
}


function Update(namei) {
    return new Promise((resolve, reject) => {
        User.updateOne({ name: namei }, (err, dbres) => {
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
        User.deleteOne({ name: namei }, (err, dbres) => {
            if (err) {
                reject(err);
            } else {
                resolve(dbres);
            }
        })
    })
}



module.exports = {
    findOrgOne,
    All,
    Update,
    Delete,
    findEventOne
}
