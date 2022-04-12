const  mongoose = require('mongoose');
const user = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        maxlength:25,
        trim:true,
    },
    username:{
        type:String,
        required:true,
        maxlength:25,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true,

    },
    avatar:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331257__480.png"

    },
    role:{
        type:String,
        default:"user"
    },
    role:{
        type:String,
        default:"user"
    },
    address:{
        type:String,
        default:""
    },
    story:{
        type:String,
        default:" ",
        maxlength:200
    },
    gander:{
        type:String,
        default:"male"
    },
    mobile:{
        type:String,
        default:"user"
    },
    followers:[
        {type:mongoose.Types.ObjectId ,ref :"user"}
    ], 
    following:[
        {type:mongoose.Types.ObjectId ,ref :"user"}
    ],


})
const User =mongoose.model("user",user)
module.exports=User