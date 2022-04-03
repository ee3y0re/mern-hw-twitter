//creates new express server
//IMPORT
const express = require("express");
//parse json to send to frontend
//so it won't look like a convoluted string; instead, it will be a nice object 
//  format
//IMPORT
//to be safe, keep all gems/dependencies with each other in the order of 
//  mongoose, express, and body parser
const bodyParser = require('body-parser');
//need passport to authenticate token and construct private routes
//using app in frontend, we save jwt webtoken that is returned from login/register route
//we want to send webtoken back in header of every api request to backend
//passport is for authenticating that token
const passport = require('passport');
//import mongoose
//IMPORT
const mongoose = require('mongoose');
//importing mongodb key from key.js
const db = require('./config/keys').mongoURI;



//connecting mongodb using mongoose
//using IMPORT
mongoose
  .connect(db, { useNewUrlParser: true })
  //check in terminal
  .then(() => console.log("Mongoose: Connected to MongoDB successfully"))
  .catch(err => console.log(err));

//using "IMPORT"
const app = express();

const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");

//instructions say 5000 but it's not working so on 3000
//PORT
const port = process.env.PORT || 3000;

//middleware for body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//basic route to render information
//ROUTE
// app.get("/", (req, res) => res.send("Nodemon enabled on npm run server, formerly hello world"));
//testing to render info over, so can comment out previous line and replace with passport initialize
//configuration for passport added after a=line having app use passport and initialize
app.use(passport.initialize());
require('./config/passport')(passport);

//tell express to use your newly imported routes
//what confuses me is the "put them in your 'hello world' route" part
//after navigating to the following:
  //http://localhost:3000/api/users/test
//I get the following:
  // {
  //   "msg": "this is the users route"
  // }
//ROUTE
app.use("/api/users", users);
app.use("/api/tweets", tweets);

//start socket to listen to on localhost 3000
//logs success message but i don't see
//actually it's on terminal :p
//USING IMPORT
app.listen(port, () => console.log(`Socket listening. Server is running on port ${port}`));