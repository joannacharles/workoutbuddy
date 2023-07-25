
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const validator= require('validator')


const Schema = mongoose.Schema
const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})
//static signup method
userSchema.statics.signup=async function(email,password){
    //validation
    if(!email || !password){
        throw Error('Fields cant be blank')
    }
    if(!validator.isEmail(email)){
        throw Error('Email not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Weakling password')
    }
    const exist =await this.findOne({email})
    //console.log('chex')

    if(exist){

        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash=await bcrypt.hash(password,salt)
   // console.log(salt,hash)

    const user= await this.create({email,password:hash})
    return user

}
//login static method
userSchema.statics.login=async function(email,password)
{
    if(!email || !password){
        throw Error('Empty Fields')
    }
    const user=await this.findOne({email})
    if(!user){
        throw Error('Invalid Username')
    }
    const match=await bcrypt.compare(password,user.password) 
    if(!match){
        throw Error('Wrong password dumbass')
    }
    return user
}
module.exports=mongoose.model('User',userSchema)