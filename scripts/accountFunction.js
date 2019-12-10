const { User } = require('./accountModel.js');
const mongoose = require('mongoose')
// const NewORg = require('./accountCreate.js');
function findOrgOne(namei) {
    return new Promise((resolve, reject) => {
        User.findOne({ name: namei }, (err, dbres) => {
            if (err) {
                reject(err);
            } else {
                resolve(dbres, 'test');
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

function findIdOne(namei) {
    console.log(namei, 'id')
    return new Promise((resolve, reject) => {
        User.findById(namei, (err, dbres) => {
            if (err) {
                reject(err);
            } else {
                resolve(dbres);
                console.log(dbres)
            }
        })
    })
}



function findEmailOne(namei) {
    return new Promise((resolve, reject) => {
        User.find({ email: namei }, (err, dbres) => {
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


function Update(namei, data) {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(namei, data, (err, dbres) => {
            if (err) {
                reject(err);
            } else {
                resolve(dbres);
            }
        })
    })
}

// function UpdatePP(namei, data) {
//     return new Promise((resolve, reject) => {
//         User.findByIdAndUpdate(namei, data, (err, dbres) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(dbres);
//             }
//         })
//     })
// }









function updateInquery(iname,data) {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(iname, { $push: { inquires: data } }, (err, dbres) => {
            if (err) {
                reject(err);
            } else {
                resolve(dbres);
            }
        }
        )
    })
}

function addPhoto(iname,photodata) {
    console.log(photodata)
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(iname, { $push: { randomphoto: photodata } }, (err, dbres) => {
            if (err) {
                reject(err);
            } else {
                resolve(dbres);
            }
        }
        )
    })
}








function updatePhoto(iname,data) {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(iname, { $push: { randomphoto: data } }, (err, dbres) => {
            if (err) {
                reject(err);
            } else {
                resolve(dbres);
            }
        }
        )
    })
}






function deleteInquiry(namei) {
    return new Promise((resolve, reject) => {
        User.deleteOne( inquires,{ $pull: { email: namei } }, (err, dbres) => {
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
    
    findEventOne,
    findEmailOne,
    findIdOne, updateInquery,updatePhoto,deleteInquiry
,addPhoto}
