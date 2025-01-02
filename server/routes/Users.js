const express = require("express");
const { Model, where } = require("sequelize");
const router=express.Router()
const {Users}=require("../models") 
const bcrypt= require("bcrypt")
const { sign }= require( "jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");


router.post("/",async (req,res)=>{
    const {username,password}=req.body
    bcrypt.hash(password,10).then((hash)=>{
        Users.create({
            username:username,password:hash
        })
        res.json("SUCCESS")
    })
})
router.post("/login",async (req,res)=>{
    const {username,password}=req.body
    const user= await Users.findOne({where:{username:username}})
    if(!user) return  res.json({error:"kullaıcı bulunamadı"})
        console.log(user.password)
    bcrypt.compare(password,user.password).then((math)=>{
        if(!math) return  res.json({error:"username or password yanliş"})
            const accessToken=sign({username:user.username,id:user.id},
        "importentsecret")
        return    res.json({token:accessToken,username:username,id:user.id});
    }) 
    
})
router.get("/auth", validateToken,(req,res)=>{
return res.json(req.user)
})
module.exports=router