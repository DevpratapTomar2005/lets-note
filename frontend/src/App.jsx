import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";

import Layout from "./components/Layout.jsx";
import Contact from "./components/Contact.jsx";
import About from "./components/About.jsx";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Home from "./components/LandingHome";
import UserHome from "./components/UserHome.jsx";
import { useSelector, useDispatch } from "react-redux";
import { isLoggedIn } from "./slices/loginSlice";
import { persistUserNextVisit, refreshUserToken } from "./services/apiCalls";
import { useState,useEffect } from "react";
import UserNotesPage from "./components/UserNotesPage.jsx";
import UserTodosPage from "./components/userTodosPage.jsx";
import SettingsPage from "./components/SettingsPage.jsx";
import { setUser } from "./slices/userSlice.js";
import NoteEditPage from "./components/NoteEditPage.jsx";
import { useMutation } from "@tanstack/react-query";
import LoadingGif from "./assets/illustrations/loadingGif.gif"
function App() {
  const dispatch = useDispatch();
 
  const isLogged = useSelector((state) => state.login.value);
  const [loading,setIsLoading]=useState(true)
  const {mutate:checkPersistence}=useMutation({

    mutationFn:async()=>{
      return await persistUserNextVisit()
    },
    onSuccess:(response)=>{
      dispatch(isLoggedIn(true))
      dispatch(setUser(response.data.user))
    },
    onError:async(error)=>{
      if(error.status===401){

      try {
          await refreshUserToken()
         persistUserNextVisit()
      } catch (error) {
        dispatch(isLoggedIn(false));
        
      }
      }
      else{

        dispatch(isLoggedIn(false))
      }
    },
    onSettled:()=>{
      setTimeout(()=>{
        setIsLoading(false)
      },[2000])
    }
   
  })
  
  
  
  useEffect(() => {
    checkPersistence()
       
  },[])

 
  return (
  
loading?(
  <div className="flex w-full h-[100vh] justify-center items-center bg-[#121212]">
    
    <img src={LoadingGif} className="w-[150px]" alt="Loading..." />
    <h1 className="font-audiowide text-5xl text-purple-300" >Loading...</h1>
    
  </div>
):(
  <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={!isLogged ? <Home /> : <UserHome />} />
              {
                (isLogged)?(
                  <>
                 
                  <Route path="/login" element={<Navigate to="/" />} />
                  <Route path="/registration" element={<Navigate to="/" />} />
                  <Route path="/notes" element={<UserNotesPage/>} />
                  <Route path="/todos" element={<UserTodosPage/>} />
                  <Route path="/features" element={<Navigate to="/" />} />
                  <Route path="/about" element={<Navigate to="/" />} />
                  <Route path="/contact" element={<Navigate to="/" />} /> 
                  <Route path="/settings" element={<SettingsPage/>} /> 
                  <Route path="/note/:noteId" element={<NoteEditPage/>}/>
                  </>
                ):(<>
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/notes" element={<Navigate to="/" />} />
                <Route path="/todos" element={<Navigate to="/" />} />
                <Route path="/settings" element={<Navigate to="/" />} />
                <Route path="/about" element={<About/>} />
                <Route path="/contact" element={<Contact/>} /> 
                </>
                )
              }
              </Route>
          </Routes>
        </Router>
)
    
  );
}

export default App;
