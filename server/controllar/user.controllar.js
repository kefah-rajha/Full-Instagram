const express = require("express");
const cloudinary = require('cloudinary').v2;
const User = require("../module/mongooseSchema");
const {cloudinaryconfig}=require("../midlleware/cloudinary");
const { findByIdAndUpdate, findOneAndUpdate, findById, findOne } = require("../module/mongooseSchema");
const userAcount = {
  userSearch: async (req, res) => {
    const users = await User.find({ username: req.body.username })
      .limit(10)
      .select("username fullname avatar");
    return res.status(200).json({
      users: users,
    });
  },
  getUserProfile: async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json({
      user: user,
    });
  },
  editprofile: async (req, res) => {
    const { fullname, username, avatar, password, email, id } = req.body.data;
    
    cloudinaryconfig;
   const uploadImage=await cloudinary.uploader.upload(avatar, async function(error, result) {
       try{
           const newavatar=result.secure_url;
           return newavatar
       }catch(err){
           console.log(err)

}});
const newAvatar =uploadImage.secure_url
   const userUpdate =await User.findByIdAndUpdate(id,{ fullname, username, password, email,
avatar:newAvatar},    {upsert: true, new: true})
console.log(userUpdate)
return res.status(200).json({
    user:userUpdate,
    success:true
})
   
  },
  follow:async(req,res)=>{
    console.log(req.body.authID,req.body.yourID,"follw")
    try{
      const user= await User.find({_id:req.body.yourID ,followers:req.body.authID})
      if(user.length != 0)return res.status(200).json({
        success:"add",
        messgae:"perviouslly,you follow this account "})
      console.log(req.body.yourID)
      const userIWantFollow=await User.findOneAndUpdate({_id:req.body.yourID},
      {  $push : {followers:req.body.authID}},{new:true});
      await User.findOneAndUpdate({_id:req.body.authID},
        {  $push : {following:req.body.yourID}},{new:true});
        console.log(userIWantFollow)
      res.status(200).json({success:"add",
      user:userIWantFollow})

    }catch(err){
      res.status(200).json({success:false,err:err})
    }
  },
  unfollow:async(req,res)=>{
    console.log(req.body)

    try{
      const user= await User.find({_id:req.body.yourID ,followers:req.body.authID})
      if(user.length == 0)return res.status(200).json({
        success:"delete",
        messgae:"perviouslly,you unfollow this account "})
      console.log(req.body.yourID)
      const userIWantFollow=await User.findOneAndUpdate({_id:req.body.yourID},
      {  $pull : {followers:req.body.authID}},{new:true});
      await User.findOneAndUpdate({_id:req.body.authID},
        {  $pull : {following:req.body.yourID}},{new:true});
        console.log(userIWantFollow)
      res.status(200).json({success:"delete",
      user:userIWantFollow})

    }catch(err){
      res.status(400).json({err:err.messgae})
    }
  }
};
module.exports = userAcount;
