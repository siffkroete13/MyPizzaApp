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
    // Von welchem host sind Anfragen erlaubt (mit * sind alle erlaubt was für einen Server eigentlich Sinn macht)
    // Nur Anfragen von localhost erlaubt
    // res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Origin", "*"); // Alle Anfragen erlaubt, wahrscheinlich besser

    // Welche header darf der Client sehen default sind erlaubt:
    // Cache-Control
    // Content-Language
    // Content-Type
    // Expires
    // Last-Modified
    // Pragma
    // Und mit diesem Befehl sind nur die unten aufgelisteten (mit Komma getrennt) erlaubt
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // Selbsterklärend
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    // Da keine Antwort an Client, muss next() aufgerufen werden
    next();
});

app.use(passport.initialize());
app.use(passport.session());
app.use('/', router);

// Start Server
app.listen(PORT, (err) => {
    if (!err) {
        console.log('Listening on  =====>  %s. ', PORT);
    } else {
        console.log('Fehler in app.listen(..), err: ', err)
    }
});
