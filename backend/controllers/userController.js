const userModel = require('../models/userModel')
const jwt=require('jsonwebtoken')

const createToken=(_id)=>{
   return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'})
}

const login=async (req,res)=>{
   const {email,password}=req.body
   try{
      const user=await userModel.login(email,password)
         const token=createToken(user._id)
         res.status(200).json({email,token})
   }
   catch(e){
      res.status(400).json({e:e.message})
   }
  
}

const signup=async (req,res)=>{
   const {email, password}=req.body
   try{
      const user=await userModel.signup(email,password)
      const token=createToken(user._id)
      res.status(200).json({email,token})
   }
   catch(e){
      console.log(':(')
      res.status(400).json({e:e.message})
   }
 }

 module.exports={login,signup}