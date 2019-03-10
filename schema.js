const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const users = new Schema({
 name: {
  type: String,
  required: true
 },
 age: {
  type: Number,
  min: 1,
  max: 100,
  required: true
 },
 location: {
  type: String,
  required: true
 }
});


module.exports = {
 users
}