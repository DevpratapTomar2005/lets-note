import { getUser, refreshUserToken, userLogout } from "../services/apiCalls"
import {useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { isLoggedIn } from "../slices/loginSlice"
import {setUser} from '../slices/userSlice'
import { toast } from "react-toastify"
import { useMutation } from "@tanstack/react-query"
import { useEffect } from "react"

function UserHome() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const user=useSelector(state=>state.user)
  
 useEffect(()=>{

  const gettingUser=async()=>{
    try {
      const response=await getUser()
      if(response.status===200){
       
        dispatch(setUser(response.data.user))
      }
    } catch (error) {
      if(error.response.status==401){
        await refreshUserToken().then(
          await getUser().then(secondRes=>{
            dispatch(setUser(secondRes.data.user))
          }
          )
            
        )
        .catch( error=>{
          dispatch(isLoggedIn(false)),
          navigate('/login'),
          toast.error(`Logged out successfully!`)
        }
        )
      }

      if(error.response.status==400 || error.response.status==500){
        dispatch(isLoggedIn(false))
        navigate('/login')
        toast.error(`${error.response.data.message}`)
      }
      
    }
  }
  gettingUser()
 },[])

const {mutate}=useMutation({
  mutationFn:async()=>{
   return await userLogout()
  },
  onSuccess:(response)=>{
    dispatch(isLoggedIn(false))
    navigate('/login')
    toast.success(`${response.data.message}`)
  },
  onError:async (error)=>{
    if(error.response.status==400 || error.response.status==500){
      dispatch(isLoggedIn(false))
      navigate('/login')
      toast.error(`${error.response.data.message}`)
    }
    if(error.response.status==401){
      await refreshUserToken().then(
        await userLogout().then(
          dispatch(isLoggedIn(false)),
          navigate('/login'),
          toast.error(`Logged out successfully!`)
        )
      )
      .catch(
        dispatch(isLoggedIn(false)),
        navigate('/login'),
        toast.error(`Logged out successfully!`)
      )
    }
  }
 })

  const logoutUser=()=>{
    mutate()
  }

  return (
    <>
    <div>This is main home</div>
    <button className="text-white bg-blue-500 p-2" onClick={()=>logoutUser()}>Logout</button>
    </>
  )
}

export default UserHome