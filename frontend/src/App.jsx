
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {useEffect} from 'react'
import LandingLayout from './components/LandingLayout'
import MainLayout from './components/MainLayout.jsx'
import Login from './components/Login'
import Registration from './components/Registration'
import Home from './components/LandingHome'
import UserHome from './components/UserHome.jsx'
import {useSelector,useDispatch} from 'react-redux'
import {isLoggedIn} from './slices/loginSlice'
import {persistUserNextVisit,refreshUserToken} from './services/apiCalls'

function App() {
  const dispatch=useDispatch()
  
  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        
        const response = await persistUserNextVisit();
        
        if (response.status === 200) {
         
          console.log(response.data.message);
          
          dispatch(isLoggedIn(true));
        } else {
       
          console.log("Unexpected response:", response);
          
          dispatch(isLoggedIn(false));
        }
      } catch (error) {
        
          if(error.status===401){
            await refreshUserToken().then(()=>{
             
              fetchUserStatus()
              
            }).catch(error=>{
              console.log(error.response.data.message);  // TODO: Add toast
              dispatch(isLoggedIn(false));
            })
          }

          if (error.status === 500 || error.status === 400) {
            console.log(error.response.data.message);  // TODO: Add toast
            dispatch(isLoggedIn(false));
          }
        
      }
    };
  
    fetchUserStatus();  
  
  }, []); 
const isLogged = useSelector((state)=>state.login.value)
  return (
    <>
     <Router>
      <Routes>
        {
          (!isLogged)?(
            <Route path="/" element={<LandingLayout/>}>
              <Route index element={<Home/>}/>
              <Route path="/features" element={<div>Features</div>}/>
              <Route path="/about" element={<div>About Us</div>}/>
              <Route path="/contact" element={<div>Contact</div>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/registration" element={<Registration/>}/>
            </Route>
          ):(
            <Route path="/" element={<MainLayout/>}>
              <Route index element={<UserHome/>}/>
            </Route>
          )
          
        }
      </Routes>
     </Router>
    </>
  )
}

export default App
