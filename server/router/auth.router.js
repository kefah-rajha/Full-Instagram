const express =require("express")
const router =express.Router()
const auth =require("../controllar/auth.controllar")

router.get("/",auth.getfind)
router.post("/regester",auth.regester);
router.post("/login",auth.login);
router.post("/logout",auth.logout);
router.get("/authorization",auth.getauth);


module.exports=router