const express = require("express");
const router=express.Router()
const {Comments}=require("../models") 
const  {validateToken } =require("../middlewares/AuthMiddleware")
router.get("/:postId", async(req,res)=>{
    const postId =req.params.postId
    const comments=await Comments.findAll({where:{PostId:postId}})
    res.json(comments)
})


router.post("/", validateToken, async (req,res)=>{
    const comment=req.body
    const username=req.user.username
    comment.username=username
    await Comments.create(comment)
    res.json(comment)
})
router.delete("/:id" ,validateToken,async(req,res)=>{
    const commetId =req.params.id
    await Comments.destroy({where:{id:commetId}})
    return res.json("deleted server")
})




module.exports=router