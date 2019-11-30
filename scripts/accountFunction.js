const NewORg = require('./accountCreate.js');
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

function findEventOne(namei) {
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



module.exports = {
    findOrgOne,
    All,
    Update,
    Delete,
    findEventOne
}
