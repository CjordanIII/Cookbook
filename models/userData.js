const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const userDataSchema = new Schema(
  {
    userid:{
      type:String
    },
    image: {
      type: String,
      required: false,
    },
    ingredient: {
      type: String,
      required: true,
      minLength: 5,
    },
    instructions:{
      type:String,
      required:true,
      minLength: 5,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = userDataSchema
module.exports = mongoose.model("Post", userDataSchema);
