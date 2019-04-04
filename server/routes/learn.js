'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Word = require('../models/word');
const List = require('../models/list');
const passport = require('passport');

router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));

router.get('/', (req, res, next) => {
  let mValue;
  const userId = req.user.id;
  return List.findOne({ userId: userId, learning: 'german' })
    .then((userList) => {
      let index = userList.head;
      const wordId = userList.words[index].wordId;
      mValue = userList.words[index].mValue;
      return Word.findOne({ _id: wordId });
    })
    .then((word) => {
      const wordToLearn = {
        germanWord: word.germanWord,
        englishWord: word.englishWord,
        wordId: word._id,
        mValue,
      };
      return res.json(wordToLearn);
    })
    .catch(err => next(err));
});

router.post('/', (req, res, next) => {
  const userId = req.user.id;
  const {
    germanWord,
    userAnswer,
    _id,
    mValue,
  } = req.body;

  let correct;
  let listId;
  let wordList;
  let head;
  let correctAnswer;

  // get list head , the word client just answered
  return List.findOne({ userId: userId, learning: 'german' })
    .then(list => {

      if (!list) {
        const err = new Error('User\'s bar german word list not found ');
        err.status = 404;
        return next(err);
      }

      listId = list.id;
      wordList = list.words;
      head = list.head;
      // make sure client is answered word that is the list head
      const idOfWordAtHead = wordList[head].wordId;
      return Word.findOne({ _id: idOfWordAtHead });
    })
    .then((word) => {
      if (word.germanWord !== germanWord) {
        const err = new Error('User word does not match current DB word');
        err.status = 400;
        return next(err);
      }


      // evaluate user answer
      if (userAnswer.toLowerCase() === word.englishWord.toLowerCase()) {
        correct = true;
      }
      else {
        correct = false;
      }

      // handle Memory score
      if (correct && wordList[head].mValue < wordList.length) {
        wordList[head].mValue *= 2;
      } else if (!correct && wordList[head].mValue > 2) {
        wordList[head].mValue /= 2;
      }

      // save word user just answered with updated mValue (mValue temporarily
      //  added to onject form words collection)
      correctAnswer = word;
      correctAnswer.mValue = wordList[head].mValue;

      // store list heads pointer 
      let nextPointer = wordList[head].pointer;

      // checks for M value that is larger than list length
      if (wordList[head].mValue > wordList.length) {
        let currentWord = wordList[head];

        // finds end of list
        while (currentWord.pointer !== null) {
          let nextPointer = currentWord.pointer;
          currentWord = wordList[nextPointer];
        }
        //  list end now second to last, list hed put at end
        currentWord.pointer = head;
        wordList[head].pointer = null;
      }
      //  creates counter to find position in the list that matches the mValue
      else {
        let counter = 1;
        let currentAddress = head;
        while (counter <= wordList[head].mValue) {
          currentAddress = wordList[currentAddress].pointer;
          counter++;
        }
        // list heads new address now in a place in the list according to mValue
        wordList[head].pointer = wordList[currentAddress].pointer;
        wordList[currentAddress].pointer = head;
      }

      //  sets new head to the nextPointerPointer value ( heads pointer), stored above.

      head = nextPointer;
      //  update DB
      return List.findOneAndUpdate({ _id: listId }, { $set: { words: wordList, head: head } })
    })
    .then(() => {
      const responseObject = {
        correct,
        mValue: correctAnswer.mValue,
        germanWord: correctAnswer.germanWord,
        englishWord: correctAnswer.englishWord,
        userAnswer
      };
      return res.json(responseObject);

    })
    .catch(err => next(err));
});

module.exports = router;
