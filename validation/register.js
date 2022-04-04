
const Validator = require("validator");
const validText = require("./valid-text");

// // validator for inputs when registering user
module.exports = function validateRegisterInput(data) {
  // // hash collector of errors
  let errors = {};

  // // making sure that handle, email, and passords are all valid strings
  data.handle = validText(data.handle) ? data.handle : "";
  data.email = validText(data.email) ? data.email : "";
  data.password = validText(data.password) ? data.password : "";
  data.password2 = validText(data.password2) ? data.password2 : "";

  // // min and max amount of characters for username
  if (!Validator.isLength(data.handle, { min: 2, max: 30 })) {
    errors.handle = "Handle must be between 2 and 30 characters"
  }

  // // no blank username
  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Handle field is required"
  }
  
  // // no blank email
  if (Validator.isEmpty(data.email)) {
    errors.handle = "Email field is required"
  }

  // // email must be standard email format
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // // password input cannot be empty
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  // // password length criteria
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters"
  }

  // // need to repeat entering the password in twice
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm-Password-Field is required";
  }

  // // if password doesn't match it repeated
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};