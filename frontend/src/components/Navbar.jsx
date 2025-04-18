import { NavLink } from "react-router-dom"
import {useSelector} from "react-redux"
import Avatar from 'react-avatar'
const Navbar = () => {
  const isLogged=useSelector((state)=>state.login.value)
  const userFullName=useSelector(state=>state.user.fullname)
  
  return (
    <>
    <nav className={(!isLogged)?("w-full flex bg-purple-600 text-white justify-between p-4"):("w-full flex bg-purple-600 text-white justify-between p-1 items-center fixed z-10")}>
       {
        (!isLogged)?(
          <>
          <div><NavLink to="/">LOGO</NavLink></div>
       
          <ul className="flex gap-2">
              <li className="px-1 mx-1 hover:font-medium"><NavLink to="/">Home</NavLink></li>
              <li className="px-1 mx-1 hover:font-medium"><NavLink to="/features">Features</NavLink></li>
              <li className="px-1 mx-1 hover:font-medium"><NavLink to="/about">About Us</NavLink></li>
              <li className="px-1 mx-1 hover:font-medium"><NavLink to="/contact">Contact</NavLink></li>
          </ul>
   
            <div className="flex gap-4">
                <button><NavLink to="/login">Login</NavLink></button>
                <button><NavLink to="/registration">Sign Up</NavLink></button>
            </div>
          </>
        ):(
          <>
          <div className="mx-10"><NavLink to="/">LOGO</NavLink></div>

          <ul className="flex gap-10">
          <li className="px-1 mx-1 hover:font-medium"><NavLink to="/">Home</NavLink></li>
          <li className="px-1 mx-1 hover:font-medium"><NavLink to="/todos">Todos</NavLink></li>
          <li className="px-1 mx-1 hover:font-medium"><NavLink to="/notes">Notes</NavLink></li>
      </ul>

          <div className="flex gap-1 bg-purple-800 rounded-md p-1 items-center cursor-pointer hover:bg-purple-400">
            <div className="font-medium text-[13px]">
              {userFullName}
            </div>
            <div>
            <Avatar name={userFullName} size="28" maxInitials={2} textSizeRatio="2" round="4px" color="magenta"/>
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