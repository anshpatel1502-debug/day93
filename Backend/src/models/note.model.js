const mongoose = require("mongoose")

const newSchema = new mongoose.Schema({
  title : {
    type : String,
    required : true
  },
  description : {
    type : String,
    required : true
  }
},{timestamps:true})

const noteModel = mongoose.model("notes",newSchema)

module.exports = noteModel