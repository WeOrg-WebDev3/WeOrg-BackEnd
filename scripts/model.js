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
  email: { 
    type: String, 
    unique: true, 
    required: true 
  },
  contact: { 
    type: Number, 
    unique: true, 
    required: true 
  },
  address: { 
    type: String, 
    unique: true, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
});
Organizer.plugin(uniqueValidator, { message: '{name} must be unique' });

// Compile model from schema
module.exports = mongoose.model('NewOrg', Organizer);