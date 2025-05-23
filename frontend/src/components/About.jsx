import { AuroraText } from "./magicui/aurora-text"
import { Particles } from "@/components/magicui/particles";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
const Aboutus = () => {
  const hamValue=useSelector(state=>state.ham.value)
  useEffect(()=>{
    AOS.init()
  },[])
  return (
 
  <div className="text-white absolute w-full hero-gradient scroll-smooth h-full">
    

      <div className={`bg-white p-3 absolute z-11 border-2 shadow-sm shadow-gray-200 ${hamValue?"top-[79px] right-0 block transition-all duration-500 ease-in-out ":"top-[-10%] hidden"}`}>
        <ul className="text-purple-900 font-semibold font-roboto text-xl w-[200px]">
          <li className="py-3 px-5"><Link to='/'>Home</Link></li>
          <li className="py-3 px-5 border-t-1"><Link to='/about'>About Us</Link></li>
          <li className="py-3 px-5 border-t-1"><Link to='/contact'>Contact</Link></li>
          <li className="py-3 px-5 border-t-1"><Link to='/login'>Login</Link></li>
          <li className="py-3 px-5 border-t-1"><Link to='/registration'>Sign Up</Link></li>
        </ul>
      </div>
    <div className="mt-30 absolute w-full" >
      <div className="text-7xl text-center font-bold mt-2"><AuroraText colors={["#FF6EC7","#FEE440","#32FFE0","#A084E8","#FCA5F1","#5EEAD4","#F8FAFC"]}>About Us</AuroraText></div>
      
      <div className="w-[80vw] border-4 about-cont-text shadow-md shadow-purple-500 p-5 mx-auto rounded-2xl text-2xl flex flex-col gap-10 mt-15" data-aos="zoom-in" >
      <span>
          I'm a developer who’s spent far too much time juggling tabs, tools, and disconnected workflows just to get basic things done. I built this platform to solve that — bringing documents, tasks, and collaboration into one focused space.
      </span>
        <span>
          Whether you're drafting a report, planning your next steps, or checking off tasks, the goal is simple: the tools should stay out of your way so you can focus on what matters.
        </span>
      </div>
        
       <div className="font-audiowide text-[13rem] h-[20vh] text-[#a9a6a6] letsnote-text mt-20 text-center" data-aos="zoom-in-up">
           LETSNOTE
        </div>
        
    </div>
    
    <Particles />    
  </div>

    
  
    
  )
}

export default Aboutus