const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../module/mongooseSchema");
const jwt = require("jsonwebtoken");
const { use } = require("../router/auth.router");
const { json } = require("body-parser");
require("dotenv").config();




const auth = {
  getfind: async (req, res) => {
    const user = await User.find();
    res.json({ success: true, user });
  },
  regester: async (req, res) => {
    await check("password")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long");
    await check("username")
      .notEmpty()
      .withMessage("username is empty it required");
    await check("email").isEmail().withMessage("email is form email");
    await check("fullname")
      .notEmpty()
      .withMessage("full name is empty it required");
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    } else {
      try {
        const { fullname, username, gander, password, email } = req.body;
        const newusername = username.toLowerCase().replace(/ /g, "");
        const user_name = await User.findOne({ username: newusername });
        if (user_name) {
          return res.status(400).json({ err: "the user name is exist" });
        } else {
          const user_email = await User.findOne({ email });


          if (user_email) {
            return res.status(400).json({ err: "the email name is exist" });
          } else {
            const finaluser = new User({
              fullname,
              username: newusername,
              gander,
              password,
              email,
            });
            await finaluser.save();

            const create_token = createAccessToken({ id: finaluser._id });
            const refreash_token = createRefreashToken({ id: finaluser._id });
             res.cookie("refreash_token", refreash_token, {
              httpOnly: true,
              secure: true,
              SameSite:"none",
              path: "api/authorization",
              maxAge: 30 * 7 * 24 * 60 * 60 * 1000,
            });
            

            return res.status(200).json({
              create_token,
              finaluser,
              success: true,
            });
          }
        }
      } catch (error) {
        res.status(402).json(error.message);
      }
    }
  },
  login: async (req, res) => {
    await check("password")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long");
    await check("email").isEmail().withMessage("email is form email");
    const result = validationResult(req);
    console.log(result);
    if (result.isEmpty()) {
      try {
        const { password, email } = req.body;
          const user_email =await User.findOne({ email });
          if (!user_email) {

              res.status(400).json({ err: "the email name isnt exist" });
          } else {

            const create_token = createAccessToken({ id: user_email._id });
            const refreash_token = createRefreashToken({ id: user_email._id });
            res.cookie('refreshtoken', refreash_token, {
              httpOnly: true,
              secure: true,
              path: "api/authorization",
              maxAge: 30*24*60*60*1000 // 30days
          })


          return res.status(200).json({success:true ,
          user :user_email,
        token:create_token
      })
                    }
                    
        
      } catch (err) {
        res.status(402).json(err.message);
      }
    }
  },

  logout: async(req,res) => {
   
    try {
      res.clearCookie('refreshtoken', {path: 'api/authorization'})
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.json({msg: err.message})
  }


  },
  authorization: async (req, res, next) => {

          try{
            const token = req.cookies.refreshtoken;
         /*   if (!token)  return res.json({message:"you must login"});
            const data = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
            const user = await User.findById(data.id).select("-password");
            if (!user) {
              return res.status(403).json({ message: "this is not exist" });}
              const accessToken = createAccessToken(data.id);
              return res.json({
                accessToken,
                user,
              })*/


          
        
      } catch (err) {
        console.log(err)
        return res.status(402).json({ message: "please login" });
      }
    
  },
  getauth:async(req,res)=>{
    const token = req.cookies.refreshtoken;
    if (!token)  return res.json({message:"you must login"});
    const data = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
            const userToken = await User.findById(data.id).select("-password");
            if (!userToken)  res.status(403).json({ message: "this is not exist" })
              const accessToken = createAccessToken({ id: data.id });
              return res.status(200).json({
               token:accessToken,
                user:userToken,


              })


  }

};
const createAccessToken = (paylod) => {
  return jwt.sign(paylod, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10d" });
};
const createRefreashToken = (paylod) => {
  return jwt.sign(paylod, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};
module.exports = auth;
