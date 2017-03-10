/*   Name: Jonathan Lee #822937603
     File Name: users.js
     Website Name: https://comp308-assignment-2.herokuapp.com
     Description: handles model for users login
*/

// require these modules for our user model
let mongoose = require("mongoose");
let Schema = mongoose.Schema; //alias
let passportLocalMongoose = require("passport-local-mongoose");

let userSchema = new Schema({
    username: {
        type: String,
        default: '',
        trim: true,
        required: 'username is required'
    },
    password: {
         type: String,
        default: '',
        trim: true,
        required: 'password is required'
    },
    email: {
         type: String,
        default: '',
        trim: true,
        required: 'email is required'
    },
    displayName: {
         type: String,
        default: '',
        trim: true,
        required: 'Display Name is required'
    },
},
{
    collection: "users"
});

//can have many other options
let options = ({missingPassportError: "Wrong password"});

userSchema.plugin(passportLocalMongoose, options);

exports.User = mongoose.model('User', userSchema);