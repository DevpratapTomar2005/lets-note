import { getUser, refreshUserToken, userLogout } from "../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isLoggedIn } from "../slices/loginSlice";
import { setUser } from "../slices/userSlice";
import { setFCMToken } from "../slices/userSlice";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import LeftSideBar from "../components/LeftSideBar";
import Dashboard  from "../components/Dashboard";
import { requestFCMToken } from "../services/firebase";
function UserHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  
  useEffect(() => {
    const gettingUser = async () => {
      try {
        const response = await getUser();
        if (response.status === 200) {
          dispatch(setUser(response.data.user));
          const token = await requestFCMToken();

          dispatch(setFCMToken(token))
        }
      } catch (error) {
        if (error.response.status == 401) {
          await refreshUserToken()
            .then(
              await getUser().then((secondRes) => {
                dispatch(setUser(secondRes.data.user));
              })
            )
            .catch((error) => {
              dispatch(isLoggedIn(false)),
                navigate("/login"),
                toast.error(`Logged out successfully!`);
            });
        }

        if (error.response.status == 400 || error.response.status == 500) {
          dispatch(isLoggedIn(false));
          navigate("/login");
          toast.error(`${error.response.data.message}`);
        }
      }
    };
    gettingUser();
  }, []);

  

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
      if (error.response.status == 400 || error.response.status == 500) {
        dispatch(isLoggedIn(false));
        navigate("/login");
        toast.error(`${error.response.data.message}`);
      }
      if (error.response.status == 401) {
        await refreshUserToken()
          .then(
            await userLogout().then(
              dispatch(isLoggedIn(false)),
              navigate("/login"),
              toast.error(`Logged out successfully!`)
            )
          )
          .catch(
            dispatch(isLoggedIn(false)),
            navigate("/login"),
            toast.error(`Logged out successfully!`)
          );
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
