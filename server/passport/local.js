'use strict';

const { Strategy : LocalStrategy } = require('passport-local');
const User = require( '../models/user');
const Subject = require( '../models/subject');

const localStrategy = new LocalStrategy((username, password, done) => {
  let user;
  username = username.toLowerCase();
  User.findOne({ username }).populate('subjects')
    .then(results => {
    
      user = results;
    
      if (!user) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect username',
          location: 'username'
        });
      }
      return user.validatePassword(password); 
    })
    .then(isValid =>{
      if (!isValid) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect password',
          location: 'password'
        });
      }
      return done(null, user);
    })
    .catch(err => {
      if (err.reason === 'LoginError') {
        return done(null, false);
      }
      return done(err);
    });
});

module.exports = localStrategy;