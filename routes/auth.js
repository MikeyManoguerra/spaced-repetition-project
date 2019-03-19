'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require('../config');

const options = { session: false, failWithError: true };
const localAuth = passport.authenticate('local', options);
// Protect endpoints using JWT Strategy

function createAuthToken(user) {
  let currentUser = {
    _id: user._id,
    fullname: user.fullname,
    username: user.username,
  };

  return jwt.sign({ currentUser }, JWT_SECRET, {
    subject: user.username,
    expiresIn: JWT_EXPIRY
  });
}

router.post('/login', localAuth, (req, res) => {

  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});

const jwtAuth = passport.authenticate('jwt', { session: false, failWithError: true });

router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});



module.exports = router;