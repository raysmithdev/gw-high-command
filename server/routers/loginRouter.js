const {BasicStrategy} = require('passport-http');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

mongoose.Promise = global.Promise;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {Guild} = require('../models/guild');
const {Leader} = require('../models/leader');


router.use(jsonParser);

//Leader Login
/*const basicStrategy = new BasicStrategy(function(username, password, callback) {
  let leader;
  Leader
    .findOne({username: username})
    .exec()
    .then(_leader => {
      leader = _leader;
      if (!leader) {
        return callback(null, false, {message: 'Incorrect username'});
      }
      return leader.validatePassword(password);
    })
    .then(isValid => {
      if (!isValid) {
        return callback(null, false, {message: 'Incorrect password'});
      }
      else {
        return callback(null, leader);
      }
    });
});*/


//passport.use(basicStrategy);
//router.use(passport.initialize());

/*router.post('/',
  passport.authenticate('basic', {session: true}), //changed to true
  (req, res) => res.json({leader: req.leader.apiRepr()})
);*/
/*router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
      error: 'Incorrect username or password'
    });
    }
    req.login(user, loginErr => {
      if (loginErr) {
        return res.status(401).json({
      error: loginErr
    });
      }
      return res.status(200).json({
      user: req.user.apiRepr(),
      message: `Welcome ${req.user.handleName}!`
    });
    });
  })(req, res, next);
});*/
/*router.post('/',
  passport.authenticate('local'),
  function(req, res) {
    res.redirect('/users/' + req.user.username);
  });*/

module.exports = function(passport){
try{
  router.post('/', passport.authenticate('local'), function(req, res, next) {
      console.log('Line 80 ');
      /*if (err) {
        return next(err);
      }*/
      console.log('Req.user line 83' + req.user);
      if (!req.user) {
        console.log('Req.user line 85' + req.user);
        return res.status(401).json({error: info.message});
      }
      req.login(req.user, loginErr => {
        if (loginErr) {
          console.log('Req.user line 90' + req.user);
          return res.status(401).json({error: loginErr});
        }
        return res.status(200).json({
          user: req.user.apiRepr(),
          message: `Welcome ${req.user.username}!`
        });
      });
  });

  return router;
}
catch(error){
  console.log(error);
  throw error;
}
}

//module.exports = router;