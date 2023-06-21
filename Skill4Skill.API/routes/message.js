const express = require("express");
const jwt= require("jsonwebtoken");
const { secret } = require("../config/config");
const { auth, authAdmin } = require("../middlewares/auth");
const { messageModel, validateMessage } = require("../models/messageModel");
const { UserModel } = require("../models/userModel");
const router = express.Router();


// bring all the users i had chat with them
router.get("/MyChat", async (req, res) => {
    let token = req.header("x-api-key");
    let decode= jwt.verify(token,secret.jwtSecret);
    req.userToken=decode;
    let id_user = req.userToken.id
    console.log(id_user);
    try {
        let Chats = await messageModel.find({ $or: [{recipient_id:id_user},{ sender_id: id_user }] })
        let ar_sender=[];
        let ar_recipient=[];
        let ar_all=[];
        let ar=[];
         ar_sender = [... new Set(Chats.map(data => data.sender_id))]
         ar_recipient = [... new Set(Chats.map(data => data.recipient_id))]
         ar_all=[...ar_sender,...ar_recipient];
         ar=ar_all.filter(item=>item!=id_user);
         let unique = ar.filter(onlyUnique);
    
        res.json(unique)
    } catch (error) {
        res.json(error)
    }
})
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

router.get("/userMessage/:id",auth,async(req,res)=>{
    let id=req.params.id;
    let id_user=req.tokenData._id
    let messages1 = await messageModel.find( {sender_id: id ,recipient_id:id_user});
    let messages2 = await messageModel.find({ sender_id: id_user ,recipient_id:id});
    let ar_messages=[...messages1,...messages2];
    res.json(ar_messages)
})

router.post("/:id", auth,async (req, res) => {
    let validBody = validateMessage(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let message = new messageModel(req.body); 
        let _recipient_id = req.params.id;
        let id = req.tokenData._id
        let user = await UserModel.findOne({ _id: id })       
        let ar = [...user.message, message._id]
        let userUpdate = await UserModel.updateOne({ _id: id }, { message: ar })
        message.sender_id = id
        message.recipient_id = _recipient_id
        await message.save();
        res.json({ message, userUpdate })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Something Worng , come back later" })
    }
})

module.exports = router;