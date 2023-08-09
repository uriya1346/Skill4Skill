const mongoose = require('mongoose');
require("dotenv").config();

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@cluster0.cmu9u.mongodb.net/skill4skill`);
  console.log("mongo connected uriya count to skill4skill chanel!!!");
}