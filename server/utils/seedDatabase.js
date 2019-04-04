'use strict';

console.log('hi');

const mongoose = require('mongoose');

const { DATABASE_URL } = require('../config');
const Word = require('../models/word');
const User = require('../models/user');
const List = require('../models/list');


const { words, users } = require('../db/data');

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => {
    return Promise.all([
      Word.insertMany(words),
      User.insertMany(users)
    ]);
  })
  .then(() => {
    return Promise.all([
      User.find(),
      Word.find()
    ]);
  })
  .then(([users, words]) => {
    const wordsList = words.map(word => {
      let item = {};
      item.wordId = word._id;
      item.mValue = word.mValue;
      item.pointer = word.pointer;
      return item;
    });

    const userLists = users.map(user => {
      let userId = user._id;
      let userOwnedList = {
        userId,
        words: wordsList,
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