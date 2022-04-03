const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
// const User = mongoose.model("User");
const User = require("../models/User");
const keys = require("./keys"); //the '../config/keys' is extra

// // passes into jwt authentication strategy
const options = {};

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken("");
// // verifies token's signature
options.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  // // jwt authentication strategy
  // // options include lot but for now we are using jwtFromRequest and 
  // //   secretOrKey
  // // jwt_payload and done, which are the args for verify
  // // payload from bcrypt, the user.id, and the user.handle
  // // done passport error cb takes in error, user, and info; i think does the 
  // //   error messages
  passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    // // temp placeholder but it honestly didn't show anything
    console.log("this is the jwt_payload", jwt_payload);

    User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          return (null, user);
        } //no else?

        return done(null, false);
      })
      .catch(err => {
        console.log(err);
        return done(err, false)
      });
  }));
};