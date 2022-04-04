//custom funciton check if given string is valid
const validText = str => {
  return typeof str === "string" && str.trim().length > 0;
}

module.exports = validText;