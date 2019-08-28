const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mongoose = require('../config/db');

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
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
      _id: this._id,
      email: this.email,
      username: this.username,
      exp: parseInt(expiry.getTime() / 1000),
    }, JWT_SECRET ); // DO NOT KEEP YOUR SECRET IN THE CODE!
}

const User = mongoose.model('User', UserSchema);
module.exports = User;