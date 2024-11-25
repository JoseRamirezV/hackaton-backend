const { Schema, model } = require('mongoose');
const userSchema = new Schema(
   {
      title: { type: String, required: true },
      description: { type: String, required: true},
      userEmail: { type: String, required: true },
      imageURL: { type: String, required: true },
      appURL: { type: String, required: true },
      tags: { type: String, required: true},
      isApp: { type: Boolean, required: true}
   },
   {
      timestamps: true,
      versionKey: false,
   }
);
module.exports = model('application', userSchema);
