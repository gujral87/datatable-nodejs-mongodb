// Dependencies
const express = require("express");
const app = express();
const port = 4000;
const mongoose = require("mongoose");
// Database URI
const DB_URI = "mongodb://tester:tester123@ds117109.mlab.com:17109/datatable";
// connect with mongoDB
mongoose.connect(DB_URI, {
 useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log("we're connected!");
});
const db_schema = require("./schema");
const users = mongoose.model("users", db_schema.users);
// APIS
app.get("/", (req, res) => {
 res.send("Backend Running");
});

// Get data from mongoDB
app.get("/api/v1/get", (req, res) => {
 users.find((err, response) => {
  console.log(response);
  res.send(response);
 });


});

// Search data in mongoDB
app.post("/api/v1/search", (req, res) => {
 users.find(req.query, (err, response) => {
  console.log(response);
  res.send(response);
 });
});


// Save data to mongoDB
app.post("/api/v1/save", (req, res) => {
 users.create(req.query)
  .then(data => res.send(data))
  .catch(err => console.log(err.message));

});


// Listen to port
app.listen(port, () => {
 console.log(`Server is running on ${port}`);
});