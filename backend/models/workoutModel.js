//const { timeStamp } = require('console')
const mongoose=require('mongoose')

//mongoose for schema, mongodb is schemaless

const schema=mongoose.Schema
const workoutSchema =new schema (
    {title:{
        type:String,
        required: true
    },
    reps:{
        type:Number,
        required:true
    },
    load:{
        type:Number,
        required:true
    },
    user_id:{
        type:String,
        required:true
    }
},{timestamps:true}
)

module.exports=mongoose.model('Workout',workoutSchema)