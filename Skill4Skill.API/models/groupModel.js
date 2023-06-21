const mongoose = require("mongoose");
const Joi = require("joi");

let groupSchema = new mongoose.Schema({
  name:String,
  info:String,
  cat_short_id:String,
  date_created:{
    type:Date,default:Date.now()
  },
  owner_id:String,
  short_id:String
})

exports.groupModel = mongoose.model("groups",groupSchema);

exports.validateGroup = (_bodyReq) => {
  let joiSchema = Joi.object({
    name:Joi.string().min(2).max(150).required(),
    info:Joi.string().min(3).max(500).required(),
    cat_short_id:Joi.string().min(2).max(99).required(),
  })
  return joiSchema.validate(_bodyReq);
}