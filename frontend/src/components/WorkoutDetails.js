import { useAuthContext } from "../hooks/useAuthContext"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const WorkoutDetails=({workout})=>{
  const {user}=useAuthContext()
    const {dispatch}=useWorkoutsContext()
    
  const handleClick= async()=>{
    if(!user){
           return 
    }
        const response = await fetch('/api/workouts/'+workout._id,{
          method:'DELETE',
          headers:{
            'Authorization':`Bearer ${user.token}`
          }
        })//prop on line 1
        const json= await response.json()
        if(response.ok){
          // dispatch action of update workout context state
        dispatch({type:'DELETE_WORKOUT',payload:json})
        }
  }
  
  return(

      
      <div className="workout-details">
        <h4>{workout.title}</h4>
        <p><strong>Load (kg): </strong>{workout.load}</p>
        <p><strong>Number of reps: </strong>{workout.reps}</p>
        <p>{workout.createdAt}</p>
        <span onClick={handleClick}>delete</span>
      </div>
    )
}

export default WorkoutDetails