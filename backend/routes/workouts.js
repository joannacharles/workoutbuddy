const express = require('express')
const workout=require('../models/workoutModel')


const{ createWorkout, getAllWorkouts, getOneWorkout, deleteWorkout, updateWorkout}=require('../controllers/workoutController')
const requireAuth=require('../middleware/requireAuth')

// GET all workouts


const router = express.Router()
// require auth for all workout routes
router.use(requireAuth)


router.get('/', getAllWorkouts)
// GET a single workout
router.get('/:id', getOneWorkout)
  
  // POST a new workout
  router.post('/', createWorkout)
  
  // DELETE a workout
  router.delete('/:id', deleteWorkout)
  
  // UPDATE a workout
  router.patch('/:id', updateWorkout)
module.exports=router