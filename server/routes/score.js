'use strict';

const express = require('express');
const router = express.Router();
const List = require('../models/list');
const Word = require('../models/word');
const passport = require('passport');

router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));

router.get('/:subjectId', (req, res, next) => {
  const userId = req.user.id;
  const subjectId = req.params.subjectId;
  return Promise.all([
    List.findOne({ userId: userId, subjectId: subjectId }),
    Word.find({ subjectId: subjectId })
  ])
    .then(([userList, words]) => {
      let wordsPlusScores = [];
      userList.words.forEach(userWord => {
        words.forEach(word => {
          if (userWord.wordId === (word.id)) {
            let wordWithValue = {
              foreignLanguage: word.foreignLanguage,
              mValue: userWord.mValue
            };
            wordsPlusScores.push(wordWithValue);
          }
        });
      });
      return res.json(wordsPlusScores);
    })
    .catch(err => next(err));
});

module.exports = router;