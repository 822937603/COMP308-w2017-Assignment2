/*
  Name: Jonathan Lee #822937603
  File Name: index.js
  Website Name: https://comp308-assignment-2.herokuapp.com
  Description: index routing for the views
*/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//define user models
let UserModel = require('../model/users');
let User = UserModel.User; //alias for user

// define the game model
let contact = require('../model/contacts');

// Global Route Variables
let currentDate = new Date();
  currentDate = currentDate.toLocaleTimeString();

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

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    username: req.user ? req.user.username : ''
   });
});

/* GET about page. */
router.get('/about', (req, res, next) => {
  res.render('content/about', {
    title: 'About',
    username: req.user ? req.user.username : ''
   });
});

/* GET products page. */
router.get('/projects', (req, res, next) => {
  res.render('content/projects', {
    title: 'Projects',
    username: req.user ? req.user.username : ''
   });
});

/* GET services page. */
router.get('/services', (req, res, next) => {
  res.render('content/services', {
    title: 'Services',
    username: req.user ? req.user.username : ''
   });
});

/* GET contact page. */
router.get('/contact', (req, res, next) => {
  res.render('content/contact', {
    title: 'Contact',
    username: req.user ? req.user.username : ''
   });
});

/* get /login - render the login view */
router.get('/login', (req, res, next) => {
  //check to see if user is already logged in
  if(!req.user) {
    // render the login page
    res.render('auth/login', {
      title: 'Login',
      contacts: '',
      messages: req.flash('loginMessage'),
      username: req.user ? req.user.username : ''
    });
  } else {
    return res.redirect('/contacts'); //redirect to the contacts list
  }
});

// POST /login - process the login page

router.post('/login', passport.authenticate('local', {
    successRedirect: '/contacts',
    failureRedirect: '/login',
    failureFlash: true
}));

// GET / register - render the register page
router.get('/register', (req, res, next) => {
    // check if the user is not already logged in
    if(!req.user)
    {
      //render the registration page
      res.render('auth/register', {
        title: 'Register',
      contacts: '',
      messages: req.flash('registerMessage'),
      username: req.user ? req.user.username : ''
      })
    }
});

//Post /register - process the register page
router.post('/register', (req, res, next) => {
  User.register(
  new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      Name: req.body.Name,
    }),
    req.body.password,
    (err) => {
      if(err)
      {
        console.log('error inserting new user');
        if(err.name == 'UserExistsError')
        {
          req.flash('registerMessage', 'Registration Error: User already exists!');
        }
        return res.render('auth/register', {
          title: 'Register',
          contacts: '',
          messages: req.flash('registerMessage'),
          username: req.user ? req.user.username : ''
        });

      }
      // if registration is successful
      return passport.authenticate('local')(req, res, ()=> {
        res.redirect('/contacts');
      });

      });
});

//Get /logout - Logout the user and redirect to the homepage
router.get('/logout', (req, res, next)=>{
  req.logout();
  res.redirect('/'); //redirect to homepage
});

module.exports = router;