const { Schema, model } = require("mongoose");
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    role: { type: String, required: true, default: "user" },
    temporalToken: { type: String, default: null },
    verified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = model("user", userSchema);
