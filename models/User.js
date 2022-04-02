const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  handle: { //column name
    type: String, //data type
    required: true //null false
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }//, //this last object was in reference and i think is meant to replace 
       //  timestamps
  //   date: {
  //   type: Date,
  //   default: Date.now
  // }
}, {
  timestamps: true
});

module.exports = User = mongoose.model("User", UserSchema);