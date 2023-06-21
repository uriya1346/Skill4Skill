const express = require("express");
const {random} = require("lodash")
const { authAdmin } = require("../middlewares/auth");
const { validateCategory, CategoryModel } = require("../models/categoryGroup");
const { groupModel } = require("../models/groupModel");
const router = express.Router();

// async function deleteImgUrlField() {
//   const groups = await CategoryModel.find({});
//   for (let i = 0; i < groups.length; i++) {
//     const group = groups[i];
//       group.img_url="";
//       let data = await groupModel.updateOne({_id:group._id},group);
//       console.log(`Deleted img_url field from ${group.name} (${group._id})`);
//   }
//   console.log('Finished deleting img_url fields from all groups');
// }


router.get("/", async(req,res) => {
  //deleteImgUrlField()
  let perPage = req.query.perPage || 20;
  let page = req.query.page >= 1 ? req.query.page - 1 : 0;
  try{
    let data = await CategoryModel.find({})
    .limit(perPage)
    .skip(page * perPage)
    res.json(data);
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
})  

router.get("/single/:url_name", async(req,res) => {
  try{
    let data = await CategoryModel.findOne({url_name:req.params.url_name})
    res.json(data);
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
})
router.get("/singleNumber/:short_id", async(req,res) => {
  try{
    let data = await CategoryModel.findOne({short_id:req.params.short_id})
    res.json(data);
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
})  

router.post("/",authAdmin, async(req,res) => {
  let validBody = validateCategory(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try{
    let category = new CategoryModel(req.body);
    category.short_id = await genShortId(); 
    await category.save();
    res.status(201).json(category);
  }
  catch(err){
    console.log(err);
    return res.status(500).json(err);
  }
})

router.put("/:idEdit", authAdmin , async(req,res) => {
  let validBody = validateCategory(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try{
    let idEdit = req.params.idEdit
    let data = await CategoryModel.updateOne({_id:idEdit},req.body)
    res.json(data);
  }
  catch(err){
    console.log(err);
    return res.status(500).json(err);
  }
})

router.delete("/:idDelete", authAdmin , async(req,res) => {
  try{
    let idDelete = req.params.idDelete
    let catDel = CategoryModel.findOne({_id:idDelete})
    let catShortId = catDel.short_id;
    let dataRental = await groupModel.deleteMany({cat_short_id:catShortId});    
    let data = await CategoryModel.deleteOne({_id:idDelete});
    res.json(data,dataRental);
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
      let data = await CategoryModel.findOne({short_id:rnd})
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