//import mongoose
const mongoose = require('mongoose');

//creates new express server
const express = require("express");
const app = express();
//importing mongodb key from key.js
const db = require('./config/keys').mongoURI;

//connecting mongodb using mongoose
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

//basic route to render information
app.get("/", (req, res) => res.send("Nodemon enabled on npm run server"));

//instructions say 5000 but it's not working so on 3000
const port = process.env.PORT || 3000;

//start socket to listen to on localhost 3000
//logs success message but i don't see
app.listen(port, () => console.log(`Server is running on port ${port}`));