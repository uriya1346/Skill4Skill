const express = require("express");
const router = express.Router();
require("dotenv").config();

router.get("/", (req,res) => {
  res.json({msg:"Work from index.js"})
})

module.exports = router;