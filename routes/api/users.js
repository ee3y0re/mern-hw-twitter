const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../../models/User");

const router = express.Router();

// // making a test route
// // this is a get request
router.get("/test", (req, res) => res.json({ msg: "this is the users route"}));

// // making a post request to register user
// // post, create, user
// //  Make a POST request to localhost: 5000 / api / users / register
// //  Make sure to use the x - www - form - urlencoded form type
// //  Add a handle, email, and password to the request body
router.post("/register", (req, res) => {
  // // i think i found the bug
  // const { errors, isValid } = validateRegisterInput(req.body);

  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }
  
  // // no dup emails
  // User.findOne({ email: req.body.email }) //find_by(email: params[:email]) from 
                                          //  the body of the request
                                          
  // // or no dup email addresses? aao changes up the flow for some reason ><
  User.findOne({ handle: req.body.handle })
  .then(user => {
    // // if the user exist
    if (user) {
      // // send error message saying user exist
      // // return res.status(400).json({ email: "A user has already registered with this address" })

      // // another way to write error message
      // // creating handle key in errors and assigning it to string of user
      // //   already existing
      errors.handle = "User already exists"
      return res.status(400).json(errors);
    } else {
      // // if no email like the one submitted doesn't exist currently, create new 
      // //   user
      // // newUser is taking in params
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
            // // temp placeholder before we use our token
            // //  .then(user => res.json(user))
            .then(user => {
              const payload = { id: user.id, handle: user.handle };

              jwt.sign(payload, keys.secretOrKey, { expiresIn: 3000 }, (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              })
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// // route to login
// // like post session but we are using a user instead
router.post("/login", (req, res) => {

  // // deconstructuring errors and isValid 
  // //   from the result of validateLoginInput(req.body)
  //  const { errors, isValid } = validateLoginInput(req.body);

  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }
  
  // // variables for email and password from the body of the request
  // // aka the inputs/params user puts in
  // const email = req.body.email;
  const handle = req.body.handle;
  const password = req.body.password;

  // // check if email exists
  // User.findOne({ email })

  // // they want us to check if handle exists instead
  User.findOne({ handle })
    // // that previous check is saved to a variable called user
    .then(user => {
      // // if that email doens't exist for an existing user
      if (!user) {
        //return error message
        //custom @user.errors.full_messages
        return res.status(404).json({ email: "This homie doesn't exist." });

        // // another way to write errors
        // errors.handle = "This homie does not exist";
        // return res.status(400).json(errors);
      }

      // // comparing the inputted password with the actual password associated
      // //   with the user
      bcrypt.compare(password, user.password)
      //isMatch is a variable that saves the result of comoparing the passwords
        .then(isMatch => {
          // // if a match was found, render the response that login successful
          if (isMatch) {
            // // going to use jsonwebtoken to sign in the users info
            // // id is keyed into user object at id key
            // // handle is keyed into user object at handle key
            const payload = { id: user.id, handle: user.handle }

            jwt.sign(
              // // paload containing the users id and handle
              payload,
              // // our token
              keys.secretOrKey,
              // // tells key to expire in an hour
              { expiresIn: 3600 },
              (err, token) => {
                // // returning a signed web token with each login in order to sign
                // //   user in on the frontend
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              })
            // //temporary line before having a jsonwebtoken payload
            // res.json({ msg: "Successfully logged in!" });
          } else {
            // // if the password does not match the one associated with the email
            // // 400 bad request
            return res.status(400).json({ password: "Incorrect Password" });

            // errors.password = "Incorrect password";
            // return res.status(400).json(errors);
          }
        });
    });
});

// //private auth route
router.get("/current", passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ msg: "Success" });
  // res.json({
  //   id: req.user.id,
  //   handle: req.user.handle,
  //   email: req.user.email
  // });
});

module.exports = router;