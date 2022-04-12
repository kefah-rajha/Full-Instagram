const express =require("express")
const router =express.Router()
const userAcount =require("../controllar/user.controllar")
router.post("/search",userAcount.userSearch)
router.get("/search/:id",userAcount.getUserProfile)
router.patch("/search/:id/editprofile",userAcount.editprofile);
router.patch("/search/:id/editprofile/follow",userAcount.follow)
router.patch("/search/:id/editprofile/unfollow",userAcount.unfollow)

module.exports=router
