const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs')
let SALT = 10

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
  event: { 
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
  }
  
  
// },{
//   collection:"CreateOrganizer"
// });
},{
  collection:"CreateOrganizer"
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


const User = mongoose.model('organizer', Organizer);
module.exports = {User}
