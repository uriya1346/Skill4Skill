const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken")
require("dotenv").config();

const userSchema = new mongoose.Schema({
  first_name:String,
  last_name:String,
  img_url:String,
  email:String,
  password:String,
  role:{
    type:String, default:"user"
  },
  create_date:{
    type:Date, default:Date.now()
  },
  street:String,
  city:String,
  home_number:String,
  phone:String,
  learning_preference:{
    type:String, default:"both"
  },
  knowledge:Array,
  interested:Array,
  requests:Array,
  connections:Array,
  languages:Array,
  reviews:Array,
  message:{type:Array,default:[]},
})

exports.UserModel = mongoose.model("users", userSchema);

exports.genToken = (_userId,_role) => {
  let token = jwt.sign({_id:_userId,role:_role}, process.env.JWT_SECRET,{expiresIn:"3d"});
  return token;
}

exports.validateUser = (_bodyReq) => {
  let joiSchema = Joi.object({
    first_name:Joi.string().min(2).max(100).required(),
    last_name:Joi.string().min(2).max(100).required(),
    email:Joi.string().min(2).max(150).email().required(),
    password:Joi.string().min(3).max(100).required(),
    city:Joi.string().min(2).max(300).required(),
    street:Joi.string().min(2).max(300).required(),
    home_number:Joi.string().min(2).max(300).required(),
    img_url:Joi.string().min(3).max(500).allow(null,""),
    phone:Joi.string().min(2).max(300).allow(null,"")
  })
  return joiSchema.validate(_bodyReq);
}
exports.validateLogin = (_bodyReq) => {
  let joiSchema = Joi.object({
    email:Joi.string().min(2).max(150).email().required(),
    password:Joi.string().min(3).max(100).required(),
  })
  return joiSchema.validate(_bodyReq);
}
