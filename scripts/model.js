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
    required: true 
  },
  address: { 
    type: String, 
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
  numEvent: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    required: true 
  },
  img: {
    type: String,
    requires: false
  },
});
Organizer.plugin(uniqueValidator, { message: '{name} must be unique' });

module.exports = mongoose.model('NewOrg', Organizer);