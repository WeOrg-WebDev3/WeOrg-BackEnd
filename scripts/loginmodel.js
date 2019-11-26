const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
let SALT = 10


const Schema = mongoose.Schema;

const login = new Schema({
    email: [{
        type: Schema.Types.ObjectId,
        ref: 'NewOrg'
    }],
    password: [{
        type: Schema.Types.ObjectId,
        ref: 'NewOrg'
    }]

})



login.pre('save', function(next){
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(SALT,function(err,salt){
            if(err) return next(err);

            bcrypt.hash(user.password,salt ,function(err,hash){
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })

    }else{
        next();
    }
})

login.methods.comparePassword = function(candidatePassword,checkpassword){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return checkpassword(err);
        checkpassword(null,isMatch)
    })
}
       


module.exports = mongoose.model('LogIn', login);