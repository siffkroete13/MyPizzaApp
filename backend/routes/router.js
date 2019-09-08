const express = require('express');
const router = express.Router();
const User = require('../models/users');
const util = require('util');
const passport = require('../config/passport');
const FoodElement = require('../models/foodElements')

// TODO rausfinden wofür zum Teufel man das braucht
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

router.use( (req, res, next) => {
  // log each request to the console
  console.log('Router middleware aufgerufen, req.session: ', req.session);
  // continue doing what we were doing and go to the route
  next(); 
});

// Register
router.post("/register", function(req, res) {
  let user = new User();

  user.username = req.body.username;
  user.email = req.body.email;
  
  console.log('POST /register, req.body.username: ', req.body.username);
  console.log('POST /register, req.body.email: ', req.body.email);

  user.makeSaltHash(req.body.password);

  console.log('POST /register, makeSalthash aufgerufen');

  user.save(function(err) {
    if(err) {
      console.log('POST /register, inside save, err: ', err);
      res.status(500).json({
        'message':  'Speichern von User fehlgeschlagen! err: ' + err
      })
    } else {
      let token;
      token = user.generateJwt();
      console.log('POST /register, inside user.save, Jwt-token: ', token);
      res.status(200);
      res.json({
      "token" : token
    });
    }
  });
});

// POST /Login
router.post('/login', (req, res, next) => {
  console.log('router: POST /login');
  passport.authenticate('local', (err, user, info) => {
    
      console.log('router: POST /login, authentificate, user: ', user);

      if (info) { // Fehler
        console.log('POST /login, login fehlgeschlagen: info: ', info);
        res.status(404).json(info); return; 
      } 
      if (err) { // Fehler
        console.log('POST /login, login fehlgeschlagen: err: ', err);
        res.status(404).json(err); return;
      } 
      if (!user) { // User existiert nicht
        console.log('POST /Login, User existiert nicht!');
         res.status(404).json(err); return;
      } 

      // If a user is found
      if(user) {
        token = user.generateJwt();
        console.log('POST /Login, user existiert! ', ' JWT-Token: ', token);
        res.status(200);
        res.json({
          "token" : token
        });
      } 
  })(req, res, next);
})

// GET /home (after registering)
router.get('/home', auth, function(req, res, next) {
  console.log('router: GET /home');

  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    User.findById(req.payload._id).exec(function(err, user) {
      if(err) {
        console.log('GET /home, inside User.findById.findById(..).exec(function(..){..}): err: ', err);
        res.status(401).json({
          "message" : "Error! No user with this id exists! Error message: " + err
        });
      } else {
        if(user) {
          res.status(200).json(user);
        } else {
          console.log('GET /home, inside User.findById.findById(..).exec(function(..){..}), no\
          user found.');
          res.json({
            "message" : "No user found."
          });
        }
      }
    });
  }
});

// GET route after registering
router.get('/getAll', function(req, res, next) {
  console.log('router: GET /getAll, req.query: ', req.query, 'req.params: ', req.params);

  let fields = '-_id foodName foodType price description vegetarian alcohol country \
  personCount optional_addition';

  console.log('router: GET /getAll, fields: ', fields);

  FoodElement.find({}, fields, function(err, data) {
      if(err) {
        console.log('inside GET /getAll, User.find(..): err: ', err);
        res.status(500).json({
          "data" : err
        });
      } else {
        console.log('inside GET /getAll, User.find(..): succeeded!data: ', data);
        res.status(200).json({
          'data': data
        });
      }
  });
});

// GET for logout logout
router.get('/logout', function (req, res, next) {
  console.log('router: GET /logout');
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

// POST /insert
router.post('/insert', function(req, res, next) {
  console.log('POST /insert, req.body.foodName: ', req.body.foodName);
  const foodElement = new FoodElement();
  foodElement.foodName = req.body.foodName;
  foodElement.foodType = req.body.foodType;
  foodElement.price = req.body.price;
  foodElement.description = req.body.description;
  foodElement.vegetarian = req.body.vegetarian
  foodElement.alcohol = req.body.alcohol
  foodElement.country = req.body.country
  foodElement.personCount = req.body.personCount
  foodElement.optional_addition = req.body.optional_addition
  
  foodElement.save(function(err, data) {
    if(err) {
      console.log('POST /insert, save(..): err: ', err);
      res.status(500).json({
        'err': 'Speichern von foodElement fehlgeschlagen! err: ' + err,
        'data': ''
      });
    } else {
      res.status(200).json({
        'err': '',
        'data': data
      });
    }
  });
});

router.use(function errorHandler(err, req, res, next) {
  console.log('Letzter eigener Fehlerhandler. Fehler: ', err);
  res.status(500);
  res.json({
    "Fehler" : err
  });
});


module.exports = router;