const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

//Define a schema
var Schema = mongoose.Schema;
//var multer = require('multer');

var Image = new Schema({
    organizerID: [{ type: Schema.Types.ObjectId, ref: 'Organizer' }],
    name: {
        type: String,
        required: true,
        unique: true
    },
    img: { 
        filename: String
    }
});
Image.plugin(uniqueValidator, { message: '{name} must be unique' });

// Compile model from schema
module.exports = mongoose.model('NewImg', Image);