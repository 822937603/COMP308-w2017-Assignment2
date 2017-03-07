// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//define user models
let UserModel = require('../model/users');
let User = UserModel.User; //alias for user

// define the contact model
let contact = require('../model/contacts');

//function to check if user is authenticated
function requireAuth(req, res, next)
{
  //check if the user is Logged index
  if(!req.isAuthenticated())
  {
    return res.redirect('/login');
  }
  next();
}


/* GET contacts List page. READ */
router.get('/', requireAuth, (req, res, next) => {
  // find all contacts in the contact collection
  contact.find( (err, contacts) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('contacts/index', {
        title: 'Contacts',
        contacts: contacts
      });
    }
  });

});

//  GET the Contact Details page in order to add a new Contact
router.get('/add', requireAuth, (req, res, next) => {
      res.render('contacts/details', {
    title: "Add a new contact",
    contacts: ''
  });
});

// POST process the Contact Details page and create a new Contact - CREATE
router.post('/add', requireAuth, (req, res, next) => {

let newContact = contact({

/*Name: String,
    ContactNumber: Number,
    Email: String*/

      "Name": req.body.Name,
      "ContactNumber" : req.body.ContactNumber,
      "Email": req.body.Email
    });

    contact.create(newContact, (err, contact) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        res.redirect('/contacts');
      }
    });

});

// GET the Contact Details page in order to edit an existing Contact
router.get('/:id', requireAuth, (req, res, next) => {

    let id = req.params.id;

    contact.findById(id, (err, conatact) => {
      if(err) {
        console.log(err);
        res.end(error);
      } else {
        // show the contact details view
        res.render('contacts/details', {
            title: 'Contacts Details',
            contacts: contact
        });
      }
    });
 
});

// POST - process the information passed from the details form and update the document
router.post('/:id', requireAuth, (req, res, next) => {

 let id = req.params.id;

     let updatedContact = contact({
      "_id": id,
       "Name": req.body.Name,
      "ContactNumber" : req.body.ContactNumber,
      "Email": req.body.Email
    });

    contact.update({_id: id}, updatedContact, (err) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        // refresh the book List
        res.redirect('/contacts');
      }
    });

});

// GET - process the delete by user id
router.get('/delete/:id', requireAuth, (req, res, next) => {
 let id = req.params.id;

    book.remove({_id: id}, (err) => {
      if(err){
        console.log(err);
        res.end(err);
      } else{
        //refresh games list
        res.redirect('/contacts');
      }
    });

});


module.exports = router;