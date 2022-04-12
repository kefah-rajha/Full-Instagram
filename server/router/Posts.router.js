const express=require("express")
const router=express.Router()
const postControllar =require("../controllar/post.controllar")
router.post("/posts",postControllar.uploadPost)
router.post("/posts/mypost",postControllar.getPOST);
router.post("/posts/myallpost",postControllar.getAllPOST)

module.exports=router
