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
  
  price: { 
    type: Number, 
    required: true 
  },
 
 
  packages: { 
    type: String, 
    required: true 
  },
  
});
Organizer.plugin(uniqueValidator, { message: '{name} must be unique' });

module.exports = mongoose.model('NewOrg', Organizer);