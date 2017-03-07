let mongoose = require('mongoose');

// create a model class
let contactSchema = mongoose.Schema({
    Name: String,
    ContactNumber: Number,
    Email: String
    
},
{
  collection: "contacts"
});

module.exports = mongoose.model('contacts', contactSchema);