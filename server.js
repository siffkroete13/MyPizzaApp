const { PORT_FROM_MY_ENV } = require('./backend/config/config');
const PORT = PORT_FROM_MY_ENV; // process.env.PORT ist für production mode
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('./backend/config/passport');
const router = require('./backend/routes/router');

// middleware
const anguarBuildPath = 'public';
app.use(express.static(anguarBuildPath));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

app.use(passport.initialize());
app.use(passport.session());
app.use('/', router);

// Start Server
app.listen(PORT, function(err) {
    if (!err) {
        console.log('==> 🌎  Listening on port %s. ', PORT);
    } else {
        console.log('Fehler in app.listen(..), err: ', err)
    }
});
