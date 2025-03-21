import { refreshUserToken, userLogout } from "../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isLoggedIn } from "../slices/loginSlice";


import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

import LeftSideBar from "../components/LeftSideBar";
import Dashboard  from "../components/Dashboard";

function UserHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  


  const { mutate } = useMutation({
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
          await userLogout();
          dispatch(isLoggedIn(false));
          navigate("/login");
          toast.error(`Logged out successfully!`);
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
    mutate();
  };

  return (
    <>
      <div className="flex">
        <LeftSideBar/>
        <Dashboard/>
      </div>
      {/* <button className="text-white bg-blue-500 p-2" onClick={()=>logoutUser()}>Logout</button> */}
    </>
  );
}

export default UserHome;
