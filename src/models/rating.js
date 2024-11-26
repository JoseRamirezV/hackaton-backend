const { Schema, model } = require('mongoose');
const ratingSchema = new Schema(
   {
      appId: { type: String, required: true },
      user: {
         id: { type: String },
         name: { type: String, required: true, default: "Anonymous" },
      },
      title: { type: String },
      comment: { type: String, required: true },
   },
   {
      timestamps: true,
      versionKey: false,
   }
);
module.exports = model('rating', ratingSchema);
