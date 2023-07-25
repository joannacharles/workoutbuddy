// for each route we have some db logic. instead of putting in all in routes folder, we can put it here so it will be cleanwe
// 
const workout=require('../models/workoutModel') // cuz using model and schema we interact with db 
const mongoose=require('mongoose')
const User=require('../models/userModel')

const getAllWorkouts=async (req,res)=>{
    try{
        const userid=req.user._id.toString()
        //console.log(userid)
        const temp=await workout.find({user_id:userid}).sort({createdAt:-1})
        res.status(200).json(temp)
    }
    catch{
        res.status(500).json()
    }
}

const getOneWorkout=async(req,res)=>{
    const{id}=req.params // .id
    if(mongoose.Types.ObjectId.isValid(id)){
    
        const temp= await workout.findById(id)
        if(!temp){
            res.status(404).json({err:"no such doc"})
        }
        else{
            res.status(200).json(temp)
        }
    }
    else{
        res.status(404).json({err:"invalid object id :(("})
    }
   
}

const createWorkout= async(req,res)=>{
    const userid=req.user._id
    //const user_id=await User.findById(userid)
    const {title, reps, load}=req.body
   // console.log('hi',user_id)
//    const remp=userid.toString()
    //console.log(userid)
    try{
        const temp=await workout.create({title,reps,load,user_id:userid})
        res.status(200).json(temp)
    }
    catch(e){
        res.status(400).json({e: e.message})
    }
    
}

const deleteWorkout=async(req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err:"id invalid"})
    }
    const um= await workout.findOneAndDelete({_id: id})
    if(!um){
        res.status(400).json('no such workout')
    }
    else{
        res.status(200).json(um)
    }
    
    
}

const updateWorkout=async(req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err:"invalid id"})
    }
    const temp=await workout.findOneAndUpdate({_id:id},{...req.body})
    if(!temp){
        return res.status(404).json({err:"no such workout"})
    }
    else{
        return res.status(200).json(temp)
    }
}
module.exports={createWorkout, getAllWorkouts, getOneWorkout,deleteWorkout,updateWorkout}