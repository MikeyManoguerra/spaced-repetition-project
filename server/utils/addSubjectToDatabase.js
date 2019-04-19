'use strict';

console.log('hi');

const mongoose = require('mongoose');

// const { DATABASE_URL } = require('../config');
const Word = require('../models/word');
const Subject = require('../models/subject');

// const { newWords, subjects } =require('../db/croatian.js')


mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    return Subject.insertMany(subjects);
  })
  .then((subjectList) => {
    let subjectId
    subjectList.forEach(subject => {
      if (subject.subject === '') { //insert name of new subject here;
        subjectId = subject._id;
      }
    });
    const newWordsWithSubjectId = newWords.map(word =>
      word = {
        subjectId,
        ...word
      });


    return Word.insertMany(newWordsWithSubjectId)
  })
  .then(results => {
    console.info(results);
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.log(err);
  });