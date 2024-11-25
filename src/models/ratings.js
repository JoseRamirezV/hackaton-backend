const { Schema, model } = require('mongoose');
const ratingSchema = new Schema(
   {
      description: { type: String, required: true},
      appId: { type: String, required: true },
      rating: { type: Number, required: true },
   },
   {
      timestamps: true,
      versionKey: false,
   }
);
module.exports = model('application', ratingSchema);