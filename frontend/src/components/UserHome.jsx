import { refreshUserToken, userLogout } from "../services/apiCalls"
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { isLoggedIn } from "../slices/loginSlice"


function UserHome() {
const dispatch=useDispatch()
const navigate=useNavigate()


  const logoutUser= async()=>{
   try {
     const response=await userLogout()
 
     if(response.status===201){
    
     dispatch(isLoggedIn(false))
     navigate("/login")
   }
   } catch (error) {
    if(error.status===400){
     //TODO: Add a toast message for the user
      navigate("/login")
    }
    if(error.status===401){
      
      await refreshUserToken().then(()=>{
        logoutUser()
      }).catch(error=>{
        // TODO: Add a toast message for the user
        console.log(error.response.data.message)
      })
    }
    if(error.status===500){
      //TODO: Add a toast message for the user
      console.log(error.response.data.message)
   }
}
}
  return (
    <>
    <div>This is main home</div>
    <button className="text-white bg-blue-500 p-2" onClick={()=>logoutUser()}>Logout</button>
    </>
  )
}

export default UserHome