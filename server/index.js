const express = require("express"); 
const bodyParser = require('body-parser');
const  cookieParser = require("cookie-parser");
const credentials= require("./credentials")


const app = express();


const cors = require("cors");
app.use(express.json({  limit: '50mb'}))
app.use(cors())
app.use(cookieParser())



const mongoose =require("mongoose")
app.use(bodyParser.urlencoded({
  parameterLimit: 100000,
  limit: '50mb',
  extended: true
}))

// parse application/json

mongoose.connect('mongodb://localhost:27017/social',()=>{
    console.log("mongoose is good")
})


//auth 

const authrouter =require("./router/auth.router")
app.use("/api",authrouter)
//user 
const useracount =require("./router/user.router")
app.use("/api",useracount)
//posts
const post=require("./router/Posts.router")
app.use("/api",post)
app.listen(5000, () => {
  console.log("start server");
});
