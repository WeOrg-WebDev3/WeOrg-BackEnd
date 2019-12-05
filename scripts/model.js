const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

//Define a schema
var Schema = mongoose.Schema;


var Organizer = new Schema({
  name: { 
    type: String,
    required: true, 
    unique: true 
  },
  address: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    unique: true, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  contact: { 
    type: Number, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  
  price: { 
    type: Number, 
    required: true 
  },
 
 
  packages: { 
    type: String, 
    required: true 
  },
  img: {
    type: String,
    required: true

  }
  
});


Organizer.pre('save', function(next){
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

Organizer.methods.comparePassword = function(candidatePassword,checkpassword){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
      if(err) return checkpassword(err);
      checkpassword(null,isMatch)
  })
}
     
Organizer.plugin(uniqueValidator, { message: '{name} must be unique' });

const User = mongoose.model('User', Organizer);
module.exports = {User}
