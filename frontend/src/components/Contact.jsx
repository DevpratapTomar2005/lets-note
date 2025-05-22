import { AuroraText } from "./magicui/aurora-text"
import { Particles } from "@/components/magicui/particles";
import Email from "../assets/icons and logos/email.svg"
import Github from "../assets/icons and logos/github.svg"
import Linkedin from "../assets/icons and logos/linkedin.svg"
import Linksite from "../assets/icons and logos/Linksite.svg"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
const Contact = () => {
   const hamValue=useSelector(state=>state.ham.value)
   useEffect(()=>{
    AOS.init()
   },[])
  return (
    
  <div className="text-white absolute w-full hero-gradient h-full scroll-smooth">
        <div className={`bg-white p-3 absolute border-2 z-11 shadow-sm shadow-gray-200 ${hamValue?"top-[79px] right-0 block transition-all duration-500 ease-in-out ":"top-[-10%] hidden"}`}>
        <ul className="text-purple-900 font-semibold font-roboto text-xl w-[200px]">
          <li className="py-3 px-5"><Link to='/'>Home</Link></li>
          <li className="py-3 px-5 border-t-1"><Link to='/about'>About Us</Link></li>
          <li className="py-3 px-5 border-t-1"><Link to='/contact'>Contact</Link></li>
          <li className="py-3 px-5 border-t-1"><Link to='/login'>Login</Link></li>
          <li className="py-3 px-5 border-t-1"><Link to='/registration'>Sign Up</Link></li>
        </ul>
      </div>
    <div className="mt-25 absolute h-fit w-full">
      <div className="text-7xl text-center font-bold mt-2"><AuroraText colors={["#FF6EC7","#FEE440","#32FFE0","#A084E8","#FCA5F1","#5EEAD4","#F8FAFC"]}>Contact Us</AuroraText></div>
      <div className="w-[80vw] border-4 shadow-md shadow-purple-500 p-5 about-cont-text mx-auto rounded-xl text-2xl flex flex-col gap-10 mt-8">
      <span>
        <h2 className="mb-3">Let’s Connect!</h2>
   Got a question, idea, or just want to say hi? I’d love to hear from you. Whether it's feedback, feature requests, or collaboration opportunities — feel free to reach out.
      </span>
        <span className="flex flex-col gap-5 text-xl">
            <span> 
         <h3 className="text-[22px] flex items-center gap-1"><img src={Email} className="w-[25px]" alt="email img" />Email :</h3> <span className="font-roboto text-purple-200 contact-text">devpratap.tomar2005@gmail.com</span>
            </span>
            <span> 
         <h3 className="text-[22px] flex items-center gap-1"><img src={Github} className="w-[25px]" alt="github img" />Github :</h3> <a href="https://github.com/DevpratapTomar2005" target="__blank" className="underline underline-offset-5 text-purple-200 font-roboto flex items-center gap-1 contact-text">DevpratapTomar2005 <img src={Linksite} alt="site link" /></a>
            </span>
            <span > 
         <h3 className="text-[22px] flex items-baseline gap-1"><img src={Linkedin} className="w-[25px]" alt="linkedin img" />LinkedIn :</h3> <a href="https://www.linkedin.com/in/devpratap-tomar/" target="__blank" className="text-purple-200 underline underline-offset-5 font-roboto flex items-center gap-1 contact-text">Devpratap Tomar <img src={Linksite} alt="site link" /></a>
            </span>
        </span>
      </div>
       <div className="font-audiowide text-[13rem] letsnote-text text-[#a9a6a6] mt-10 text-center" data-aos="zoom-in-up" >
        LETSNOTE
       </div>
    </div> 
   
    <Particles />
     
  </div>
    
  )
}

export default Contact