const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  subject: { type: String, required: true }
});


subjectSchema.set('toJSON', {
  virtuals: true,     // include built-in virtual `id`
  transform: (doc, ret) => {
    delete ret._id; // delete `_id`
    delete ret.__v;
  }
});
module.exports = mongoose.model('Subject', subjectSchema);

