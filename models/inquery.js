const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

//Define a schema
var Schema = mongoose.Schema;


var query2 = new Schema({
  organizer: {type: mongoose.Schema.Types.ObjectId,
         ref: 'NewOrg'},
  name: { 
    type: String,
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
  event: { 
    type: String, 
    required: true 
  },
  message: { 
    type: String, 
    required: true 
  }
});
query2.plugin(uniqueValidator, { message: '{name} must be unique' });

module.exports = mongoose.model('Inquery', query2);