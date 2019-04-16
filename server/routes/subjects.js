'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Word = require('../models/word');
const List = require('../models/list');
const Subject = require('../models/subject');
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false, failWithError: true });

router.get('/', (req, res, next) => {
  return Subject.find()
    .then(subjects => {
      return res.json(subjects);
    })
    .catch(err => {
      return next(err);
    });
});

router.get('/userSubjects', jwtAuth, (req, res, next) => {
  let userId = req.user.id;

  return User.findOne({ _id: userId }).populate('subjects')
    .then(user => {
      const userSubjects = user.subjects;
      return res.json(userSubjects);
    })
    .catch(err => {
      return next(err);
    });
});

router.post('/:subjectId', jwtAuth, (req, res, next) => {
  const userId = req.user.id;
  const subjectId = req.params.subjectId;

  return User.findOne({ _id: userId })
    .then((user) => {
      let subjectOnUser = user.subjects.find(subject => {
        return subject === subjectId;
      });

      if (subjectOnUser) {
        let error = new Error('you aready have a list on this subject');
        error.status = 400;
        return next(error);
      }
      return Word.find({ subjectId });
    })
    .then((words) => {
      let pointer = 1;
      const newWordsForList = words.map(word => {
        let item = {};
        item.wordId = word.id;
        item.mValue = 1;
        item.pointer = pointer === words.length ? null : pointer;
        pointer += 1;
        return item;
      });
      const newList = {
        words: [...newWordsForList],
        userId,
        subjectId,
      };
      return List.create(newList);
    })
    .then(() => {
      return User.findByIdAndUpdate({ _id: userId }, { $push: { subjects: subjectId } });
    })
    .then(() => {
      res.sendStatus(204).end();
    })
    .catch(err => next(err));
});

module.exports =  router ;