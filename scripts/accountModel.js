const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs')
let SALT = 10

//Define a schema
var Schema = mongoose.Schema;


var userSchema = new Schema({
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
  },
  inquires: {
    type: Array,

  },
  img: {
    type:String,
    required: true
  },
  randomphoto:{
    type: Array,
  }

}, {
    collection: "CreateOrganizer"
  });


userSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(SALT, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      })
    })

  } else {
    next();
  }
})

// userSchema.methods.comparePassword = function(candidatePassword,checkpassword){
//   bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
//       if(err) return checkpassword(err);
//       checkpassword(null,isMatch)
//   })
// }




userSchema.plugin(uniqueValidator, { message: '{name} must be unique' });


const User = mongoose.model('organizer', userSchema);
module.exports = { User }
