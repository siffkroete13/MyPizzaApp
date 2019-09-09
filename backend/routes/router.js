const express = require('express');
const router = express.Router();
const User = require('../models/users');
const util = require('./../../util');
console.log('util: ', util);
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
  util.myLog('\nRouter middleware, req.session: ', req.session);
  console.log('\nRouter middleware, req.sessionID: ', req.sessionID);
  console.log('\nRouter middleware, req.payload: ', req.payload);
  console.log('\nRouter middleware, req.params: ', req.params);
  console.log('\nRouter middleware, req.headers: ', req.headers);
  console.log('\nRouter middleware, req.body: ', req.body);
  // continue doing what we were doing and go to the route

  next();
});

// Register
router.post("/register", function(req, res) {
  let user = new User();

  // TODO : user-input-validation, zur Sicherheit und wegen "einzige Verantwortung"...
  user.username = req.body.username;
  user.email = req.body.email;
  let password = req.body.password;

  console.log('POST /register, req.body.username: ', req.body.username, ' | req.body.email: ', req.body.email,
  ' | req.body.password: ', req.body.passwrd);

  user.makeSaltHash(password);

  console.log('POST /register, makeSalthash aufgerufen');

  user.save(function(err) {
    if(err) {
      if(!err.status) err.status = 404;
      err.message += " Fehler in POST /register!";
      next(err);
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
  console.log('router: POST /login, req.body.username: ', req.body.username, ' | req.body.password: ',
  req.body.password);

  // Hier wäre es interessant zu erfahren, auf welchem Wege passport an username und passwort kommt, (denn
  // innerhalb passport.authenticate(..) wird username und password benutzt).
  // Wahrscheinlich werden username und password während app.use(passport.initialize()) und
  // app.use(passport.session()) übergeben;
  passport.authenticate('local', (err, user, info) => {
    
      console.log('router: POST /login, authentificate, user : ', user);

      if (info) { // Fehler
        console.log('POST /login, login fehlgeschlagen: info : ', info);
        let err = new Error("Fehler in POST /login, info: " + info);
        err.status(404);
        next(err);
        return;
      } 
      if (err) { // Fehler
        console.log('POST /login, login fehlgeschlagen: err : ', err);
        if(!err.status) err.status = 404;
        err.message += ' Fehler in POST /login!';
        next(err);
        return;
      } 
      if (!user) { // User existiert nicht
         let err = new Error('POST /Login, User existiert nicht!');
         err.status = 404;
         next(err);
      }

      req.login(user, (err)  => {
        if(err) {
          console.log('POST /Login, inside req.login(..), err : ', err);
          if(!err.status) err.status = 404;
          err.message += ' Fehler in POST /login, rew.login(..)!';
          return next(err);
        } else {
          console.log('POST /Login, inside: req.login(..), user : ', user);
          token = user.generateJwt();
          console.log('POST /Login, inside: req.login(..), token=user.generateJwt() :  ', token);
          res.status(200);
          res.json({
            "token" : token
          });
        }
      });
  })(req, res, next);
})


// GET route after registering
router.get('/getAll', function(req, res, next) {
  console.log('router: GET /getAll, req.query: ', req.query, 'req.params: ', req.params);

  let fields = '-_id foodName foodType price description vegetarian alcohol country \
  personCount optional_addition';

  console.log('router: GET /getAll, fields: ', fields);

  FoodElement.find({}, fields, function(err, data) {
      if(err) {
        console.log('inside GET /getAll, User.find(..): err: ', err);
        if(!err.status) err.status = 404;
        err.message += ' Fehler in GET /getAll, FoodElement.find(..), User nicht gefunden!';
        next(err);
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
        if(!err.status) err.status = 500;
        err.message += ' Fehler in GET /logout, reg.session.destroy(..), Fehler beim beenden der Session!';
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
      if(!err.status) err.status = 500;
      err.message += ' Fehler in POST /insert FoodElement.save(..), Fehler beim Speichern des Produkts!';
      next(err);
    } else {
      res.status(200).json({
        'err': '',
        'data': data
      });
    }
  });
});

// Letzer eigener Fehlerhandler
router.use(function errorHandler(err, req, res, next) {
  console.log('Letzter eigener Fehlerhandler. Fehler: ', err);
  if(!err.status) err.status = 500;
  err.message += ' Fehler im letzen eigenen Fehlernadler, wird weitergeschickt an wer weiss..';
  next(err); // TODO ist das richtig?
});


module.exports = router;
