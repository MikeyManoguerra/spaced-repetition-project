'use strict';

console.log('hi');

const mongoose = require('mongoose');

const { DATABASE_URL } = require('../config');
const Word = require('../models/word');
const User = require('../models/user');
const List = require('../models/list');
const Subject = require('../models/subject');

const { germanWords } = require('../db/germanWords');
const { czechWords } = require('../db/czechWords');
const { users } = require('../db/mockUsers');
const { subjects } = require('../db/subjects');

let germanId, czechId, userId1, userId2;

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => mongoose.connection.db.dropDatabase())
  .then(()=>{
    return Promise.all([
      User.ensureIndexes(),
      List.ensureIndexes(),
      Subject.ensureIndexes(),
      Word.ensureIndexes(),      
    ])
  })
  .then(() => {
    return Promise.all([
      Subject.insertMany(subjects),
      User.insertMany(users)
    ]);
  })
  .then(([subjectList, userList]) => {
    subjectList.forEach(subject => {
      if (subject.subject === 'german') {
        germanId = subject._id;
      }
      if (subject.subject === 'czech') {
        czechId = subject.id;
      }
    });

    userId1 = userList[0].id;
    userId2 = userList[1].id;

    const czechWordsWithSubjectId = czechWords.map(word =>
      word = {
        ...word,
        subjectId: czechId
      });
    const germanWordsWithSubjectId = germanWords.map(word =>
      word = {
        ...word,
        subjectId: germanId
      });

    return Promise.all([
      Word.insertMany(germanWordsWithSubjectId),
      Word.insertMany(czechWordsWithSubjectId),
      User.findByIdAndUpdate({ _id: userId1 }, { $set: { subjects: [czechId] } }),
      User.findByIdAndUpdate({ _id: userId2 }, { $set: { subjects: [germanId] } }),
    ]);
  })
  .then(([germanList, czechList]) => {

    let pointer = 1;
    const germanWordsForUser = germanList.map(word => {
      let item = {};
      item.wordId = word.id;
      item.mValue = 1;
      item.pointer = pointer === germanList.length ? null : pointer;
      pointer += 1;
      return item;
    });

    let pointer2 = 1;
    const czechWordsForUser = czechList.map(word => {
      let item = {};
      item.wordId = word.id;
      item.mValue = 1;
      item.pointer = pointer2 === czechList.length ? null : pointer2;
      pointer2 += 1;
      return item;
    });

    const czechDbList = {
      words: [...czechWordsForUser],
      userId: userId1,
      subjectId: czechId
    };
    const germanDbList = {
      words: [...germanWordsForUser],
      userId: userId2,
      subjectId: germanId
    };

    return List.insertMany([czechDbList, germanDbList])
  })
  .then(results => {
    console.info(results);
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.log(err);
  });