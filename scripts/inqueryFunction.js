const quer = require('./inqueryModel.js');
function findOnequer(namei) {
    return new Promise((resolve, reject) => {
      quer.findOne({ name: namei }, (err, dbres) => {
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
      quer.find({}, (err, dbres) => {
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
      quer.updateOne({ name: namei }, (err, dbres) => {
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
      quer.deleteOne({ name: namei }, (err, dbres) => {
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
      quer.findOne({ email: emaili }, (err, user) => {
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
    findOnequer,
    All,
    Update,
    Delete,
    Login
}
