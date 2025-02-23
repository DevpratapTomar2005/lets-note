import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";

import Layout from "./components/Layout.jsx";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Home from "./components/LandingHome";
import UserHome from "./components/UserHome.jsx";
import { useSelector, useDispatch } from "react-redux";
import { isLoggedIn } from "./slices/loginSlice";
import { persistUserNextVisit, refreshUserToken } from "./services/apiCalls";
import { useState,useEffect } from "react";




function App() {
  const dispatch = useDispatch();
  const [loading,setIsLoading]=useState(true)
  useEffect(() => {
    const checkUserPersistence = async () => {
      try {
        
        const response = await persistUserNextVisit();
        
        
        if (response.status===200) {
          dispatch(isLoggedIn(true))
        }
      } catch (error) {

        dispatch(isLoggedIn(false));
      } finally {
       setTimeout(()=>{
        setIsLoading(false)
       },700)
        
      }
    };

   
    checkUserPersistence();
  }, [])

 
  const isLogged = useSelector((state) => state.login.value);
  return (
  
loading?(
  <div>Loading...</div>
):(
  <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={!isLogged ? <Home /> : <UserHome />} />
              <Route path="/features" element={<div>Features</div>} />
                  <Route path="/about" element={<div>About Us</div>} />
                  <Route path="/contact" element={<div>Contact</div>} /> 
              {
                (isLogged)?(
                  <>
                  //TODO: Want to add the above routes to navigate directly to the home if entered while logged in
                  <Route path="/login" element={<Navigate to="/" />} />
                  <Route path="/registration" element={<Navigate to="/" />} />
                  </>
                ):(<>
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
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
