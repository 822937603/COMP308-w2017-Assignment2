/* Name: Jonathan Lee #822937603
     File Name: contacts.js
     Website Name: https://comp308-assignment-2.herokuapp.com
     Description: handles the user model
*/

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