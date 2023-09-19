const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const userDataSchema = new Schema(
  {
    Comments: { type: String, required: false },
    post: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = userDataSchema
