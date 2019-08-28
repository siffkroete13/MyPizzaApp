const { JWT_SECRET, JWT_EXP } = require('../config/config');
const mongoose = require('mongoose');


// Die 3 set's ist der Fix für die deprecated Warnung.
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//Set up default mongoose connection
var mongoDB_URI= 'mongodb://localhost:27017/my_pizza_doener_db';
mongoose.connect(mongoDB_URI, { useNewUrlParser: true });

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + mongoDB_URI);
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

module.exports = mongoose;