// Dependencies
const path = require("path");
var bodyParser = require('body-parser');
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

//Middleware
app.use(express.static('frontend'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
 extended: true
}));

// APIS
app.get("/", (req, res) => {
 res.sendFile('index.html', {
  root: __dirname
 });
});

// Get data from mongoDB
app.get("/api/v1/get", (req, res) => {
 console.log(req.query); // query from datatable
 var searchVal = req.query.search.value || 'Pawan';
 users.find((err, response) => {
  res.send({
   "draw": 1,
   "recordsTotal": response.length,
   "recordsFiltered": response.length,
   "data": response
  });
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
 users.create(req.body)
  .then(data => res.send(data))
  .catch(err => res.send(err));
});


// Listen to port
app.listen(port, () => {
 console.log(`Server is running on ${port}`);
});
