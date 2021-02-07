var mongoose = require("mongoose");
var uuid = require('uuid');
var memeSchema = new mongoose.Schema(
  {

    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true
    },
    url: {
      type: String,
      required: true,
      trim: true
    },
    caption: {
      type: String,
      required: true,
    },
  
    },{ versionKey: false }
);


module.exports = mongoose.model("Meme", memeSchema);
