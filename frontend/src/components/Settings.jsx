

import { useSelector } from "react-redux"
import CreateModal from "./CreateModal"
import Avatar from 'react-avatar'
import { refreshUserToken, userLogout, uploadPfp } from "../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isLoggedIn } from "../slices/loginSlice";
import {setPfp} from "../slices/userSlice"
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import editButton from "../assets/icons and logos/edit.svg"
import LoadingDots from '../assets/icons and logos/loading dots.gif'
import AiChatbot from "./AiChatbot";
const Settings = () => {
    const showCreateModal = useSelector(state => state.showCreateModal.value)
    const user=useSelector(state=>state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
  
  
    const { mutate:logout, isPending:logoutPending } = useMutation({
      mutationFn: async () => {
        return await userLogout();
      },
      onSuccess: (response) => {
        dispatch(isLoggedIn(false));
        navigate("/login");
        toast.success(`${response.data.message}`);
      },
      onError: async (error) => {
        
        if (error.response.status == 401) {
          await refreshUserToken()
          try {
            logout();
          } catch (error) {
            dispatch(isLoggedIn(false))
            navigate("/login")
            toast.error(`User logged out!`)
          }
        } else {
          dispatch(isLoggedIn(false))
          navigate("/login")
          toast.error(`${error.response.data.message}`)
        }
      },
    });

    const {mutate:uploadProfileImg ,isPending:pfpImgPending}=useMutation({
        mutationFn:async(formData)=>{
          return await uploadPfp(formData)
        }
        ,
        onSuccess:(response)=>{
          dispatch(setPfp(response.data.pfpUrl))
          toast.success(response.data.message)
        },
        onError:async(error,formData)=>{
          if (error.response.status == 401) {
            await refreshUserToken()
            try {
              uploadProfileImg(formData)
            } catch (error) {
              dispatch(isLoggedIn(false))
              navigate("/login")
              toast.error(`User logged out!`)
              
            }
          }

        toast.error(`${error.response.data.message}`)
        }
    })

    const logoutUser = () => {
      logout()
    }

    const getPfp=(image)=>{
      const formData = new FormData()
      formData.append("pfp", image)
      uploadProfileImg(formData)
    }
   
  return (
    <>
 
    <div className="h-[calc(90vh+16px)] relative w-full top-[2.74rem] ml-20 settingsPage">
    {showCreateModal && <CreateModal />}
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center gap-10">
        <div className="relative w-fit h-fit shadow-md shadow-gray-300 rounded-full">
          {
            (!user.pfp)?(<Avatar  name={user.fullname} round={true} size="220" maxInitials={2} color="magenta"/>):(<img src={user.pfp}
              className={`w-55 h-55 rounded-full ${(!user.pfp)?(null):("object-cover")}`} alt="profile image"/>)
          }
        
        <label htmlFor="pfpInput">
        <div className={`absolute bg-purple-500 ${pfpImgPending?("p-0"):("p-3")} w-[45px] h-[45px] rounded-full text-white  z-10 bottom-4 right-0 shadow-md shadow-gray-400 cursor-pointer hover:bg-purple-400 hover:bottom-5 transition-all duration-150`}>
          <img src={pfpImgPending?(LoadingDots):(editButton)} alt="edit"/>
        </div>
        </label>
        <input type="file" id="pfpInput" className="hidden" onChange={(e)=>getPfp(e.target.files[0])} />
        </div>
        <div className="flex flex-col gap-5">
          <div className="bg-purple-50 py-3 px-2  text-lg w-105 border-b-2 border-purple-500 rounded settings-name">
            {user.fullname}
          </div>
          <div className="bg-purple-50 py-3 px-2  text-lg w-105 border-b-2 border-purple-500 rounded settings-email">
            {user.email}
          </div>
        </div>
      <div><button onClick={()=>logoutUser()} className="p-2 w-50 text-center rounded-md text-lg bg-purple-600 text-white hover:bg-purple-500">{
        logoutPending?("Logging Out..."):("Logout")
        }</button></div>
      </div>
    </div>
    </div>
    <div>
          <AiChatbot/>
    </div>
    </>
  )
}

export default Settings