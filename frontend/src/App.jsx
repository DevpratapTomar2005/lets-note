
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {useEffect,useState} from 'react'
import Layout from './components/Layout.jsx'

import Login from './components/Login'
import Registration from './components/Registration'
import Home from './components/LandingHome'
import UserHome from './components/UserHome.jsx'
import {useSelector,useDispatch} from 'react-redux'
import {isLoggedIn} from './slices/loginSlice'
import {persistUserNextVisit,refreshUserToken} from './services/apiCalls'

function App() {
  const dispatch=useDispatch()
  const [loading,setLoading]=useState(true)
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
      finally{
        setTimeout(()=>{
          setLoading(false)
        },1000)
      }
    };
  
    fetchUserStatus();  
  
  }, []); 
const isLogged = useSelector((state)=>state.login.value)
  return (
    <>
    {
      loading?(
        <div>Loading...</div>
      ):
      (
      <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
              <Route index element={(!isLogged)?(<Home/>):(<UserHome/>)}/>
                {
                  (!isLogged)?(
                    <>
                    <Route path="/features" element={<div>Features</div>}/>
                    <Route path="/about" element={<div>About Us</div>}/>
                    <Route path="/contact" element={<div>Contact</div>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/registration" element={<Registration/>}/>
                    </>
                  ):(
                    null
                  )
                }
          </Route>
      </Routes>
      </Router>
      )
    }
     
    </>
  )
}

export default App
