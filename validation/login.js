// // validator dependency
const Validator = require("validator");
// // importing function to check text validity
const validText = require("./valid-text");

module.exports = function validateLoginInput(data) {
  let errors = {};

  // // checking if email and password are valid strings
  data.email = validText(data.email) ? data.email : "";
  data.password = validText(data.password) ? data.password : "";

  // // if the email doens't follow standard email format
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // // email field cannot be empty
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  // // password input cannot be empty
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    //return object containing any errors and isValid key
    errors,
    //isValid key is boolean indicating presence of errors (true if none)
    isValid: Object.keys(errors).length === 0
  }
}