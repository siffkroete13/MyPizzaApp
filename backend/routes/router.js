const { JWT_SECRET } = require('../config/config');
const express = require('express');
const router = express.Router();
const util = require('./../../util');
const passport = require('../config/passport');
const User = require('../models/users');
const FoodElement = require('../models/foodElements')
const jwt = require('express-jwt');

const auth_middleware_from_express_jwt = jwt(
  {
    secret: JWT_SECRET
  }
);

app.use(auth_middleware_from_express_jwt).unless({
  path: ['/api/register', 'api/login', 'api/getAll', 'api/insert']
});

router.use( (req, res, next) => {
  // log each request to the console
  util.myLog('\nRouter middleware, req.session: ', req.session);
  console.log('\nRouter middleware, req.sessionID: ', req.sessionID);
  console.log('\nRouter middleware, req.user: ', req.payload);
  console.log('\nRouter middleware, req.params: ', req.params);
  console.log('\nRouter middleware, req.header: ', req.header);
  console.log('\nRouter middleware, req.headers: ', req.headers);
  console.log('\nRouter middleware, req.body: ', req.body);
  // continue doing what we were doing and go to the route

  next();
});

// Register
router.post("/api/register", (req, res) => {
  let user = new User();

  // TODO : user-input-validation, zur Sicherheit und wegen "einzige Verantwortung"...
  user.username = req.body.username;
  user.email = req.body.email;
  let password = req.body.password;

  console.log('POST /register, req.body.username: ', req.body.username, ' | req.body.email: ', req.body.email,
  ' | req.body.password: ', req.body.passwrd);

  user.makeSaltHash(password);

  console.log('POST /register, makeSalthash aufgerufen');

  user.save( (err) => {
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
         'data': '',
         'err': '',
         'token': token
      });
    }
  });
});

// POST /Login
router.post('/api/login', (req, res, next) => {
  console.log('router: POST /login, req.body.username: ', req.body.username, ' | req.body.password: ',
  req.body.password);

  // Hier wäre es interessant zu erfahren, auf welchem Wege passport an username und passwort kommt, (denn
  // innerhalb passport.authenticate(..) wird username und password benutzt).
  // Wahrscheinlich werden username und password während app.use(passport.initialize()) und
  // app.use(passport.session()) übergeben;
  passport.authenticate('local', (err, user, info) => {
    // TODO : Authenticate und isAuthenticate() => funktion dort WT prüfen (wenn möglich ohne DB)
    // Bis jetzt ist alles mitten im Code und trotz JWT ist bei jeder isAuthenticate-Prüfung eine DB-
    // Anfrage fällig, ist das wirklich nötig?
    
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
            'data': '',
            'err':'',
            'token': token,
          });
        }
      });
  })(req, res, next);
})

router.get('/api/profile', (req, res, next) => {
  const user = req.user;
  // If no user ID exists in the JWT return a 401
  if (!user._id || !user.username || !user.role) {
    let err = new Error('"UnauthorizedError: Das Profil ist nur für Authorisierte Nutzer sichtbar!"');
    err.status = 401;
    err.message = 'UnauthorizedError: Das Profil ist nur für Authorisierte Nutzer sichtbar!';
    err.name = 'UnauthorizedError';
    next(err);
  } else {
    User.findById(req.user._id).exec( (err, data) => {
      if(err) {
        console.log('inside GET /profile, User.findById(..): err: ', err);
        if(!err.status) err.status = 401;
        err.message += ' Fehler in GET /profile, User.findById(..), User nicht gefunden!';
        err.name = 'UnauthorizedError';
        next(err);
      } else {
        console.log('inside GET /profile, User.findById(..): succeeded!data: ', data);
        res.status(200).json({
          'data': data,
          'err': '',
          'token': ''
        });
      }
    });
  }
});

// GET route after registering
router.get('/api/getAll', (req, res, next) => {
  console.log('router: GET /getAll, req.query: ', req.query, 'req.params: ', req.params);

  let fields = '-_id foodName foodType price description vegetarian alcohol country \
  personCount optional_addition';

  console.log('router: GET /getAll, fields: ', fields);

  FoodElement.find({}, fields, (err, data) => {
      if(err) {
        console.log('inside GET /getAll, User.find(..): err: ', err);
        if(!err.status) err.status = 404;
        err.message += ' Fehler in GET /getAll, FoodElement.find(..), User nicht gefunden!';
        next(err);
      } else {
        console.log('inside GET /getAll, User.find(..): succeeded!data: ', data);
        res.status(200).json({
          'data': data,
          'err': '',
          'token': ''
        });
      }
  });
});

router.get('/api/getAllUsers', (req, res, next) => {
  User.find({}, (err, data) => {
    console.log('GET /getAllUsers, data: ', data);
    if(err) {
      if(!err.status) err.status = 404;
      err.message += ' Users nicht gefunden!';
      next(err);
    } else {
      res.status(200).json({
        'data': data,
        'err': '',
        'token': ''
      });
    }
  });
});

// GET for logout logout
router.get('/api/logout', (req, res, next) => {
  console.log('router: GET /logout');
  if (req.session) {
    // delete session object
    req.session.destroy( (err) => {
      if (err) {
        if(!err.status) { err.status = 500; }
        err.message += ' Fehler in GET /logout, reg.session.destroy(..), Fehler beim beenden der Session!';
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

// POST /insert
router.post('/api/insert', (req, res, next) => {
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
  
  foodElement.save( (err, data) => {
    if(err) {
      console.log('POST /insert, save(..): err: ', err);
      if(!err.status) err.status = 500;
      err.message += ' Fehler in POST /insert FoodElement.save(..), Fehler beim Speichern des Produkts!';
      next(err);
    } else {
      res.status(200).json({
        'data': data,
        'err': '',
        'token': ''
      });
    }
  });
});

// Letzer eigener Fehlerhandler
router.use( (err, req, res, next) => {
  console.log('Letzter eigener Fehlerhandler. Fehler: ', err);
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      'data': '',
      'err': err,
      'token': ''
    });
  }
  if(!err.status) err.status = 500;
  err.message += ' Fehler im letzen eigenen Fehlernadler, wird weitergeschickt an wer weiss..';
  console.log('Fehler im letzen eigenen Fehlernadler, wird weitergeschickt an wer weiss..');
  next(err); // TODO ist das richtig?
});


module.exports = router;
