import { AuroraText } from "./magicui/aurora-text"
import { Particles } from "@/components/magicui/particles";
const Aboutus = () => {
  return (
    
  <div className="text-white absolute w-full pb-40 hero-gradient overflow-hidden scroll-smooth">
    <div className="mt-30 absolute w-full">
      <div className="text-7xl text-center font-bold mt-2"><AuroraText colors={["#FF6EC7","#FEE440","#32FFE0","#A084E8","#FCA5F1","#5EEAD4","#F8FAFC"]}>About Us</AuroraText></div>
      <div className="w-[80vw] border-4 shadow-md shadow-purple-500 p-5 mx-auto rounded-2xl text-2xl flex flex-col gap-10 mt-15">
      <span>
          I'm a developer who’s spent far too much time juggling tabs, tools, and disconnected workflows just to get basic things done. I built this platform to solve that — bringing documents, tasks, and collaboration into one focused space.
      </span>
        <span>
          Whether you're drafting a report, planning your next steps, or checking off tasks, the goal is simple: the tools should stay out of your way so you can focus on what matters.
        </span>
      </div>
       <div className="font-audiowide text-[13rem] text-[#a9a6a6] mt-20 text-center">
           LETSNOTE
        </div>
    </div>
    <div>
    </div>
    <Particles />
     
  </div>
    
  )
}

export default Aboutus