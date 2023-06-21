const express = require("express");
const {random} = require("lodash")
const { authAdmin } = require("../middlewares/auth");
const {groupModel, validateGroup } = require("../models/groupModel");
const router = express.Router();

router.get("/", async(req,res) => {
  let perPage = req.query.perPage || 10;
  let page = req.query.page >= 1 ? req.query.page - 1 : 0;
  let sort = req.query.sort || "_id";
  let reverse = req.query.reverse == "yes" ? 1 : -1;
  let cat = req.query.cat || null
  try{
    objFind = (cat) ? {cat_short_id:cat} : {}
    let data = await groupModel.find(objFind)
    .limit(perPage)
    .skip(page * perPage)
    .sort({[sort]:reverse})
    res.json(data);  
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
})

router.get("/allCars", async(req,res) => {
  try{
    let data = await groupModel.find({})
    res.json(data);
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
})

router.get("/search", async(req,res) => {
  let perPage = req.query.perPage || 10;
  let page = req.query.page >= 1 ? req.query.page - 1 : 0;
  let sort = req.query.sort || "_id";
  let reverse = req.query.reverse == "yes" ? 1 : -1;
  let searchQ = req.query.s;
  try{
    let searchReg = new RegExp(searchQ,"i")
    let data = await groupModel.find({$or:[{name:searchReg},{info:searchReg}]})
    .limit(perPage)
    .skip(page * perPage)
    .sort({[sort]:reverse})
    res.json(data);
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
})

router.get("/amount", async(req,res) => {
  try{
    let cat = req.query.cat || null
    objFind = (cat) ? {cat_short_id:cat} : {}
    let data = await groupModel.countDocuments(objFind);
    res.json({amount:data});
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
})

router.get("/single/:id", async(req,res) => {

  try{
    let id = req.params.id
    let data = await groupModel.findOne({_id:id})
    res.json(data);
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
})

router.get("/single/short/:id", async(req,res) => {

  try{
    let id = req.params.id
    let data = await groupModel.findOne({short_id:id})
    res.json(data);
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
})
router.get("/single/url/:url_name", async(req,res) => {

  try{
    let id = req.params.id
    let data = await groupModel.findOne({url_name:url_name})
    console.log(data);
    
    res.json(data);
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
})

router.get("/visited", async(req,res) => {
  let visited = req.query.visited;
  let visited_ar = visited.split(",");
  try{
    let data = await groupModel.find({short_id:{$in:visited_ar}})
    res.json(data);
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
})
//need to take user id and put it on owner id filed
router.post("/" ,authAdmin, async(req,res) => {
  let validBody = validateGroup(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try{
    let product = new groupModel(req.body);
    product.short_id = await genShortId();
    await product.save();
    res.status(201).json(product);
  }
  catch(err){
    console.log(err);
    return res.status(500).json(err);
  }
})

router.put("/:idEdit",authAdmin , async(req,res) => {
  let validBody = validateGroup(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try{
    let idEdit = req.params.idEdit;
    let data = await groupModel.updateOne({_id:idEdit},req.body);
    res.status(200).json(data);
  }
  catch(err){
    console.log(err);
    return res.status(500).json(err);
  }
})


router.delete("/:idDel",authAdmin , async(req,res) => {
  try{
    let idDel = req.params.idDel;
    let data = await groupModel.deleteOne({_id:idDel});
    res.status(200).json(data);
  }
  catch(err){
    console.log(err);
    return res.status(500).json(err);
  }
})

const genShortId = async() => {
  let flag = true;
  let rnd;
  while(flag){
    rnd = random(0,999999)
    try{
      let data = await groupModel.findOne({short_id:rnd})
      if(!data){
        flag = false;
      }
    }
    catch(err){
      console.log(err);
      flag = false;
      return res.status(500).json(err);
    }
  }
  return rnd;
}



module.exports = router;