const express = require('express');
const router = express.Router();
const User = require('../models/user');

const officerCheck = (req, res, next) =>{
  if(!req.user) {
    res.redirect('/auth/login');
  } else {
    if (req.user[0].role !== 'officer') {
      res.redirect('/');
    } else {
      next();
    }
  }
};

//Officers
router.get('/officers', officerCheck, (req, res) => {
  res.locals.metaTags = {
    title: 'Officers',
  };
  res.render('officers', { user: req.user });
});

//Add Officer
router.get('/add_officer', officerCheck, (req, res) => {
  res.locals.metaTags = {
    title: 'Add Officers',
  };
  res.render('add_officer', { user: req.user });
});

router.post('/add_officer', officerCheck, (req, res)=> {
  User.updateOne({username: req.body.username}, {
    role: 'officer'
  }, function(err, stat) {
    if(err){
      res.render(err);
    } else{
      res.render('add_officer', {user: req.user});
    }
  });
});

//Remove Officers
router.get('/remove_officer', officerCheck, (req, res) => {
  res.locals.metaTags = {
    title: 'Remove Officers',
  };
  res.render('remove_officers', { user: req.user });
});

router.post('/remove_officer', officerCheck, (req, res) => {
  User.updateOne({username: req.body.username}, {
    role: 'student'
  }, function(err, stat) {
    if(err){
      res.render(err);
    } else{
      res.render('remove_officer', {user: req.user});
    }
  });
});

module.exports.router = router;
module.exports.officerCheck = officerCheck;