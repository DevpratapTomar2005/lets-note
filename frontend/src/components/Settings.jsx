import LeftSideBar from "./LeftSideBar"
import { useSelector } from "react-redux"
import CreateModal from "./CreateModal"
import Avatar from 'react-avatar'
import { refreshUserToken, userLogout } from "../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isLoggedIn } from "../slices/loginSlice";

import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import editButton from "../assets/icons and logos/edit.svg"
const Settings = () => {
    const showCreateModal = useSelector(state => state.showCreateModal.value)
    const user=useSelector(state=>state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
  
  
    const { mutate:logout } = useMutation({
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
          try {
            await refreshUserToken();
            logout();
          } catch (error) {
            dispatch(isLoggedIn(false));
            navigate("/login");
            toast.error(`Error logging out: ${error.message}`);
          }
        } else {
          dispatch(isLoggedIn(false));
          navigate("/login");
          toast.error(`${error.response.data.message}`);
        }
      },
    });
    const logoutUser = () => {
      logout()
    }
  return (
    <div className="flex">
    <LeftSideBar/>
    <div className="h-[calc(90vh+16px)] relative w-full top-[2.74rem] ml-20">
    {showCreateModal && <CreateModal />}
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center gap-10">
        <div className="relative w-fit h-fit shadow-md shadow-gray-300 rounded-full">
        <Avatar  name={user.fullname} round={true} size="220" maxInitials={2} color="magenta"/>
        <div className="absolute bg-purple-500 p-3 rounded-full text-white  z-10 bottom-4 right-0 shadow-md shadow-gray-400 cursor-pointer">
          <img src={editButton} alt="edit"/>
        </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="bg-purple-50 py-3 px-2  text-lg w-105 border-b-2 border-purple-500 rounded">
            {user.fullname}
          </div>
          <div className="bg-purple-50 py-3 px-2  text-lg w-105 border-b-2 border-purple-500 rounded">
            {user.email}
          </div>
        </div>
      <div><button onClick={()=>logoutUser()} className="p-2 w-50 text-center rounded-md text-lg bg-purple-600 text-white hover:bg-purple-500">Logout</button></div>
      </div>
    </div>
    </div>
    </div>
  )
}

export default Settings