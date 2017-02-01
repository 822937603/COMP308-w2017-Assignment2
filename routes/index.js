var express = require('express');
var router = express.Router();

//gobal route variables
let currentDate = new Date();
  currentDate = currentDate.toLocaleTimeString();

/* GET home page, wildcard*/
router.get('/', (req, res, next) => {
 

  res.render('index', { 
    title: 'Express',
    date: currentDate
   });
});

/* GET about page. */
router.get('/about', (req, res, next) => {
  //res.render('index', { title: 'About' });
   res.render('about', { 
    title: 'About',
    date: currentDate
   });
});

module.exports = router;
