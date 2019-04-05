const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  foreignLanguage: { type: String, required: true },
  nativeLanguage: { type: String, required: true },  
  pointer: {type: Number}
});


wordSchema.set('toJSON', {
  virtuals: true,     // include built-in virtual `id`
  transform: (doc, ret) => {
    delete ret._id; // delete `_id`
    delete ret.__v;
  }
});
module.exports = mongoose.model('Word', wordSchema);

