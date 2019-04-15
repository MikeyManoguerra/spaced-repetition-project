const mongoose = require('mongoose');

const germanWordSchema = new mongoose.Schema({
  foreignLanguage: { type: String, required: true },
  nativeLanguage: { type: String, required: true },
  pointer: { type: Number } // initial pointer only, perhaps remove later, and generate on list creation
});


germanWordSchema.set('toJSON', {
  virtuals: true,     // include built-in virtual `id`
  transform: (doc, ret) => {
    delete ret._id; // delete `_id`
    delete ret.__v;
  }
});
module.exports = mongoose.model('germanWord', germanWordSchema);

