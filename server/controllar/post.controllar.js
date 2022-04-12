const POSTS = require("../module/postSchema");
const cloudinary = require("cloudinary").v2;
const { cloudinaryconfig } = require("../midlleware/cloudinary");
const { resolve } = require("path");
const { rejects } = require("assert");
const { body } = require("express-validator");

const postControllar = {
  uploadPost: async (req, res) => {
    const { images,id } = req.body;
    console.log(id)
    let photoURLs = [];

    const resUploadImage = images.map(
      async (photo, index) =>
        new Promise(async (resolve, reject) => {
          cloudinaryconfig;
          const uploadImage = await cloudinary.uploader.upload(
            photo,
            async function (error, result) {
              if (error) {
                reject(error);
              } else {
                const photoURL = result.secure_url;
                resolve(photoURL);
              }
            }
          );
        })
    );
    Promise.all(resUploadImage).then(async (results) => {
      const newPosts = new POSTS({
        images: results,
        user:id
      });

      await newPosts.save();
    });

    res.status(200).json({ success: true });
  },
  getPOST:async(req,res)=>{
    console.log(req.body.id)
    try{
      const{id}=req.body
      const resPost=await POSTS.find({user:id}).sort({
        createdAt:1
      })
      res.status(200).json({
        posts:resPost
      })

    }catch(error){
      console.log(error)
    }
 
  },
  getAllPOST:async(req,res)=>{
    console.log(req.body)
    
    try{
      const{following}=req.body
      console.log(following)

      const resallPost=await POSTS.find({user: {$in:[...following]}}).sort({
        createdAt:-1
      })
     console.log(resallPost)
      res.status(200).json({
        allposts:resallPost
      })

    }catch(error){
      console.log(error)
    }
    
    
  }
};
module.exports = postControllar;
