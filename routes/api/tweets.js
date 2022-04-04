//import
const express = require("express");
//using express
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Tweet = require("../../models/Tweet");
const validateTweetInput = require("mongoose");

// // i think this is all tweets
router.get("/", (req, res) => {
  Tweet.find()
    .sort({ date: -1 })
    .then(tweets => res.json(tweets))
    .catch(err =>
      res.status(404).json({ notweetsfound: "No tweets found." }));
});

// // i think this is show tweets for single user
router.get("/user/:user_id", (req, res) => {
  Tweet.find({ user: req.params.user_id })
    .then(tweets => res.json(tweets))
    .catch(err =>
      res.status(404).json({ notweetsfound: "No tweets found from this user." }))
});

// // // show single tweet
// router.get("/:id", (req, res) => {
//   Tweet.findById(req.params.id)
//     .then(tweet => res.json(tweet))
//     .catch(err =>
//       // // is the typo supposed to be a missing "s"?
//       res.status(404).json({ notweetfound: "No tweet found with that ID." }));
// });

//test route
//every express route requires request and response as argument
//it's res.json, read error message carefully
// router.get("/test", (req, res) => res.json({ msg: "This is the tweets route" }));



//export
module.exports = router;