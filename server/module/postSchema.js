const  mongoose = require('mongoose');
const posts = new mongoose.Schema({
    images:{
        type:Array,
        required:true
    },
  user:[{ type:mongoose.Types.ObjectId, ref:"user" }],
  likes:[{type:mongoose.Types.ObjectId,ref:"user"}],
  Comment:[{type:mongoose.Types.ObjectId,ref :"comment"}],

},{  timestamps:true
})
const Posts=mongoose.model("post",posts)
module.exports=Posts
