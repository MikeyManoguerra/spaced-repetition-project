const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  words: { type: Array, default: undefined },
  head: { type: Number, default: 0 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});
// Add `createdAt` and `updatedAt` fields
listSchema.set('timestamps', true);


listSchema.set('toJSON', {
  virtuals: true,     // include built-in virtual `id`
  transform: (doc, ret) => {
    delete ret._id; // delete `_id`
    delete ret.__v;
  }
});
module.exports = mongoose.model('List', listSchema);

