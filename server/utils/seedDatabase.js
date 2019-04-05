'use strict';

console.log('hi');

const mongoose = require('mongoose');

const { DATABASE_URL } = require('../config');
const Word = require('../models/word');
const User = require('../models/user');
const List = require('../models/list');
const Subject = require('../models/subject');


const { words, users } = require('../db/data');
const { subjects } = require('../db/subjects');

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => {
    return Promise.all([
      Word.insertMany(words),
      User.insertMany(users),
      Subject.insertMany(subjects),
    ]);
  })
  .then(() => {
    return Promise.all([
      User.find(),
      Word.find(),
      Subject.findOne({ subject: 'german' })
    ]);
  })
  .then(([users, words, subject]) => {
    const wordsList = words.map(word => {
      let item = {};
      item.wordId = word.id;
      item.pointer = word.pointer;
      item.mValue = 1;
      return item;
    });

    const userLists = users.map(user => {
      let userId = user.id;
      let userOwnedList = {
        userId,
        words: wordsList,
        subjectId: subject.id,

      };
      return userOwnedList;
    });
    return List.insertMany(userLists);
  })
  .then(results => {
    console.info(results);
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.log(err);
  });