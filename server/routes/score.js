'use strict';

const express = require('express');
const router = express.Router();
const List = require('../models/list');
const Word = require('../models/word');
const passport = require('passport');

router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));

router.get('/', (req, res, next) => {
  const userId = req.user.id;
  return Promise.all([
    List.findOne({ userId }),
    Word.find()
  ])
    .then(([userList, words]) => {
      let wordsPlusScores = [];
      userList.words.forEach(userWord => {
        words.forEach(word => {
          if (userWord.wordId.equals(word._id)) {
            let wordWithValue = {
              germanWord: word.germanWord,
              mValue: userWord.mValue
            };
            wordsPlusScores.push(wordWithValue);
          }
        });
      });
      res.json(wordsPlusScores);
    })
    .catch(err => next(err));
});

module.exports = router;