//we import passport packages required for authentication
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

//We will need the models folder to check passport agains
var dbUser = require("../models/users");

console.log('passport.js modul runs');

// Telling passport we want to use a Local Strategy. In other words,
//we want login with a username/email and password
passport.use(new LocalStrategy(
    // Our user will sign in using an username"
    {
        usernameField: "username"
    },
    function(username, password, done) {
        console.log('passport.use(new LocalStrategy(..)), pass: ', password,
         ', username: ', username);
        // When a user tries to sign in this code runs
        dbUser.findOne({ username: username }, function(err, user) {
            console.log('dbUser.findOne(..).then(..): user:  ', user);
            
            // Wenn kein user mit diesem username
            if (!user) {
                    return done(null, false, {
                    message: "Falscher Username"
                });
            }

            // Wenn User vorhanden aber pass falsch
            if (!user.validPassword(password)) {
                console.log('inside passport.use: findOne: , es exestiert ein User: ', user,
                ' aber password ist falsch!');
                return done(null, false, {message: "Falsches Passwort"});
            }

            // Wenn login erfolgreich
            return done(null, user);
        }); // End dbUser.findOne(..)
    }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work

// tell passport how to serialize the user
passport.serializeUser( (user, done) => {
    console.log('passport.serializeUser. User.username wird gespeichert in file oder DB ',
    'user.username: ', user.username);
    done(null, user.username);
});

passport.deserializeUser((username, done) => {
    console.log('passport.deserializeUser, username: ', username);
    dbUser.findOne({
        where: {
            username: username
        }
    }).then( function(dbUser) {
        console.log('passport.deserializeUser(..).then(..), user in der DB anhand username: ',
        username, ' gefunden.');
        done(null, dbUser);
    }).catch(function(err) {
        console.log('Fehler in passport.deserializeUser(..).then(..), err: ', err);
        done(err, null);
    });
});

// Exporting our configured passport
module.exports = passport;