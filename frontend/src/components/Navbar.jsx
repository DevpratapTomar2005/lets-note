import { NavLink } from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import Avatar from 'react-avatar'
import hamburger from "../assets/icons and logos/hamburger.svg"
import { setHamNav } from "@/slices/hamSlice"
import Cross from '../assets/icons and logos/cross.svg'

const Navbar = () => {
  const isLogged=useSelector((state)=>state.login.value)
  const user=useSelector(state=>state.user)
    const hamValue=useSelector(state=>state.ham.value)
  const dispatch=useDispatch()
  return (
    <>
    <nav className={(!isLogged)?("w-full flex bg-transparent text-white justify-between items-center px-4 py-2 absolute z-10"):("w-full flex bg-purple-600 text-white justify-between p-1 items-center fixed z-10")}>
       {
        (!isLogged)?(
          <>
          <div><NavLink to="/">LOGO</NavLink></div>
       
          <ul className="flex gap-7 text-[17px] nav-links ml-15">
              <li className="px-1 mx-1 hover:font-medium"><NavLink to="/">Home</NavLink></li>
              <li className="px-1 mx-1 hover:font-medium"><NavLink to="/about">About Us</NavLink></li>
              <li className="px-1 mx-1 hover:font-medium"><NavLink to="/contact">Contact</NavLink></li>
          </ul>
   
            <div className="flex  auth-cont gap-3">
                <button className="text-[17px] auth-text"><NavLink to="/login">Login</NavLink></button>
                <button className="bg-white text-purple-800 hover:text-purple-600 text-[17px] auth-text font-semibold p-2 rounded-full"><NavLink to="/registration">Sign Up</NavLink></button>
                <img src={!hamValue?(hamburger):(Cross)} onClick={()=>dispatch(setHamNav(!hamValue))} className={`hamburger ${!hamValue?(null):("p-2 rounded-full bg-purple-700 top-4")}`} alt="hamburger" />
            </div>
          </>
        ):(
          <>
          <div className="mx-10"><NavLink to="/">LOGO</NavLink></div>


          <div className="flex gap-1 bg-purple-800 rounded-md p-1 items-center cursor-pointer hover:bg-purple-400">
            <div className="font-medium text-[13px]">
              {user.fullname}
            </div>
            <div>
           {
              (!user.pfp)?( <Avatar name={user.fullname} size="28" maxInitials={2} textSizeRatio="2" round="4px" color="magenta"/>):(<img src={user.pfp}
              className={`w-7 h-7 rounded ${(!user.pfp)?(null):("object-fill")}`} alt="profile image"/>)
            }
           
            </div>
          </div>
          </>
        )
       }
    </nav>
    </>
  )
}

export default Navbar