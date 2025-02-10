import { NavLink } from "react-router-dom"

const LandingNav = () => {
  return (
    <>
    <nav className="w-full flex bg-purple-600 text-white justify-between p-4">
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
    </nav>
    </>
  )
}

export default LandingNav