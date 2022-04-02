//import
const express = require("express");
//using express
const router = express.Router();

//test route
//every express route requires request and response as argument
//it's res.json, read error message carefully
router.get("/test", (req, res) => res.json({ msg: "This is the tweets route" }));

//export
module.exports = router;