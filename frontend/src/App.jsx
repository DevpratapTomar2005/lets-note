
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LandingLayout from './components/LandingLayout'
import MainLayout from './components/MainLayout.jsx'
import Login from './components/Login'
import Registration from './components/Registration'
import Home from './components/LandingHome'
import UserHome from './components/UserHome.jsx'
import {useSelector} from 'react-redux'



function App() {
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
