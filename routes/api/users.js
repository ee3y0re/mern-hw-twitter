const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

const router = express.Router();

//making a test route
//this is a get request
router.get("/test", (req, res) => res.json({ msg: "this is the users route"}));

//making a post request to register user
//post, create, user
// Make a POST request to localhost: 5000 / api / users / register
// Make sure to use the x - www - form - urlencoded form type
// Add a handle, email, and password to the request body
router.post("/register", (req, res) => {
  //no dup emails
  User.findOne({ email: req.body.email }) //find_by(email: params[:email]) from 
                                          //  the body of the request
  .then(user => {
    //if the user exist
    if (user) {
      //send error message saying user exist
      return res.status(400).json({ email: "A user has already registered with this address" })
    } else {
      //if no email like the one submitted doesn't exist currently, create new 
      //  user
      //newUser is taking in params
      const newUser = new User({
        handle: req.body.handle,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//route to login
//like post session but we are using a user instead

module.exports = router;