const { Schema, model } = require('mongoose');
const applicationSchema = new Schema(
   {
      title: { type: String, required: true },
      description: { type: String, required: true },
      userId: { type: String, required: true },
      imageURL: { type: String, required: true },
      appURL: { type: String, required: true },
      tags: { type: [String], required: true },
      isApp: { type: Boolean, required: true },
      upVotes: { type: Number, required: true, default: 0 },
      downloads: { type: Number, required: true, default: 0 },
   },
   {
      timestamps: true,
      versionKey: false,
   }
);
module.exports = model('application', applicationSchema);
