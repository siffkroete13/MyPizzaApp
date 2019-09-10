const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mongoose = require('../config/db');
const { JWT_SECRET } = require('../config/config');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  hash: String,
  salt: String
});

UserSchema.methods.makeSaltHash = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJwt = function () {
    const timeOfExpiration = 60 * (0*60) * (0*24) * (0*365); // 60 sek
    const unixTimeOfNow = Math.floor( Date.now() / 1000 );

    console.log('timeOfExpiration: ', timeOfExpiration);

    return jwt.sign({
      _id: this._id,
      email: this.email,
      username: this.username,
      exp: unixTimeOfNow + timeOfExpiration,
    }, JWT_SECRET ); // DO NOT KEEP YOUR SECRET IN THE CODE!
    // TODO : Ist es richtig JWT_SECRET in .env file aufzubewahren? Oder vielleicht besser in json-file?
    // oder irgendwie in process.env...?
}

const User = mongoose.model('User', UserSchema);
module.exports = User;


