import { useEffect }from 'react'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/NewWorkout'
import { useAuthContext } from '../hooks/useAuthContext'

const Home = () => {
  const {workouts, dispatch} = useWorkoutsContext()
  const {user}=useAuthContext()
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts',{
        headers:{
          'Authorization':`Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }
    if(user){
      fetchWorkouts()
    }
    
  }, [dispatch,user])

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home

// import{useEffect} from 'react'
// import WorkoutDetails from '../components/WorkoutDetails'
// import NewWorkout from '../components/NewWorkout'
// import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

// const Home=()=>{
//     const {workouts,dispatch}=useWorkoutsContext()
//    useEffect(()=>{
//     const fetwchWorkouts=async ()=>{
//         const response= await fetch('/api/workouts',{
//             method:"GET",
//             mode:'cors',
//             headers:{
//                 'Access-Control-Allow-Origin':'*',
//                 'Access-Control-Allow-Credentials':'true',
//                 'Access-Control-Allow-Methods':'POST, PUT, DELETE, GET, OPTIONS'
//             }
//         })
//         const json =await  response.json()
//         console.log(json)
//        // if(response.ok){
//            // setWorkout(json)
//         //}
//         if(response.ok){
//             dispatch({type:'SET_WORKOUTS',payload:json})// this i the action
//         }
//     }
//     fetwchWorkouts()
//    },[dispatch])

//     return(
//         <div className="home">
            
//             <div className="workouts">
//                 {workouts && workouts.map((w)=>(
//                     <WorkoutDetails key={w._id} workout={w} />
//                 ))}
//             </div>
//             <NewWorkout/>
//         </div>
//     )
// }

// export default Home