import { Particles } from "@/components/magicui/particles";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Link } from "react-router-dom";
const LandingHome = () => {
  
  
  return (
    <>
    
    
    <div className="bg-[#121212] text-white relative top-0 scroll-smooth  overflow-hidden">
      <div className="flex items-center justify-center py-3 px-4 h-[80vh] hero-gradient overflow-hidden">
        <div className="absolute">
        <div className="text-center w-[100%] mx-auto mt-7">
          <h1 className="text-[2.7rem] font-bold">Write. Track. Complete. <AuroraText colors={["#FF6EC7","#FEE440","#32FFE0","#A084E8","#FCA5F1","#5EEAD4","#F8FAFC"]}>All in One Place!</AuroraText></h1>
          <h3 className="text-[18px] my-5 w-[70%] mx-auto">Create rich documents, manage to-dos, and stay on track — with a powerful tool built for clarity and control</h3>
        <button className="bg-white text-neutral-800 py-3 px-5 rounded mt-5 hover:text-purple-700 font-semibold font-roboto"><Link to='/registration'>Get Started {`>>>`}</Link></button>
        </div>
        </div>
        <Particles className="w-[100%]" />
      </div>
      <div className="py-20">
        <div className="flex w-[90vw] mx-auto items-center justify-center gap-5 p-10 border-3 border-white rounded-lg feature-gradient">

        <div className="w-1/2">
          <h1 className="text-[2.3rem] my-3 font-bold">Document-Style Notes</h1>
          <h3 className="text-[1.35rem] font-roboto ">Write clean, structured documents right in your browser. Enjoy a familiar, editor-like experience tailored for clarity and focus. Use headings, lists, code blocks, and rich formatting to create everything from quick notes to professional reports.</h3>
        </div>
        <div className="w-[70%] self-center shadow-[2px_3px_10px_rgba(0,0,0,0.2)] shadow-purple-400">
          <img src="https://www.websitecdn.com/website-com/website-builder-articles/overview/what-features/website_com_templates.webp" alt="document-note img" />
        </div>
        </div>
      </div>
      <div className="py-20 my-10">
        <div className="flex items-center w-[90vw] mx-auto justify-center gap-10 p-10  feature-gradient">
        <div className="w-[70%] self-center shadow-[2px_3px_10px_rgba(0,0,0,0.2)] shadow-purple-400">
          <img src="https://www.websitecdn.com/website-com/website-builder-articles/overview/what-features/website_com_templates.webp" alt="document-note img" />
        </div>
        <div className="w-1/2">
          <h1 className="text-[2.3rem] my-3 font-bold"> <AuroraText colors={["#FF6EC7","#FEE440","#32FFE0","#A084E8","#FCA5F1","#5EEAD4","#F8FAFC"]}>AI</AuroraText>-Powered Writing-Get unstuck fast.</h1>
          <h3 className="text-[1.35rem] font-roboto ">Whether you're facing writer's block, need fresh ideas, or want to fine-tune your message, our AI-powered writing assistant is here to help. Instantly generate compelling content, rephrase awkward sentences, or expand brief thoughts into fully developed paragraphs.</h3>
        </div>
        </div>
      </div>
      <div className="py-20 my-20">
        <div className="flex w-[90vw] mx-auto items-center justify-center gap-10 p-10 border-3 border-white rounded-lg feature-gradient">

        <div className="w-1/2">
          <h1 className="text-[2.3rem] my-3 font-bold">Smart To-Do Management-Add, edit, and complete tasks effortlessly.</h1>
          <h3 className="text-[1.35rem] font-roboto ">Stay organized and in control with intuitive, AI-assisted task management. Our smart to-do system helps you prioritize your day, set deadlines, and break big goals into manageable steps — all in a clean, user-friendly interface.</h3>
        </div>
        <div className="w-[70%] self-center shadow-[2px_3px_10px_rgba(0,0,0,0.2)] shadow-purple-400">
          <img src="https://www.websitecdn.com/website-com/website-builder-articles/overview/what-features/website_com_templates.webp" alt="document-note img" />
        </div>
        </div>
      </div>
      <div className="py-20 my-10">
        <div className="flex items-center w-[90vw] mx-auto justify-center gap-10 p-10  feature-gradient">
        <div className="w-[70%] self-center shadow-[2px_3px_10px_rgba(0,0,0,0.2)] shadow-purple-400">
          <img src="https://www.websitecdn.com/website-com/website-builder-articles/overview/what-features/website_com_templates.webp" alt="document-note img" />
        </div>
        <div className="w-1/2">
          <h1 className="text-[2.3rem] my-3 font-bold">Real-Time <AuroraText colors={["#FF6EC7","#FEE440","#32FFE0","#A084E8","#FCA5F1","#5EEAD4","#F8FAFC"]}>Notifications</AuroraText></h1>
          <h3 className="text-[1.35rem] font-roboto ">Never miss a deadline, meeting, or important update again. Our smart notification system keeps you informed and on track with timely alerts tailored to your schedule and priorities.</h3>
        </div>
        </div>
      </div>
      <div className="py-20 my-20">
        <div className="flex w-[90vw] mx-auto items-center justify-center gap-10 p-10 border-3 border-white rounded-lg feature-gradient">

        <div className="w-1/2">
          <h1 className="text-[2.3rem] my-3 font-bold">Real-Time Collaboration-Write together from anywhere instantly.</h1>
          <h3 className="text-[1.35rem] font-roboto ">Collaborate with teammates, classmates, or clients in a shared document with real-time text syncing. Watch edits appear as they’re made, and co-write seamlessly without delays.</h3>
        </div>
        <div className="w-[70%] self-center shadow-[2px_3px_10px_rgba(0,0,0,0.2)] shadow-purple-400">
          <img src="https://www.websitecdn.com/website-com/website-builder-articles/overview/what-features/website_com_templates.webp" alt="document-note img" />
        </div>
        </div>
      </div>
      <div className="py-20 my-20">
        <div className="flex items-center w-[90vw] mx-auto justify-center gap-10 p-10">
        <div className="bg-[#434446] w-[300px] text-4xl text-center font-bold px-10 py-20 rounded-full shadow-[1px_3px_10px_rgba(0,0,0,0.2)] shadow-purple-400">
          Why Use This Tool?
        </div>
        <div className="text-3xl w-3/4 font-roboto">
        
        All-in-one productivity meets intelligent writing. Whether you're crafting documents, managing tasks, or collaborating in real time, our platform has everything you need — right in your browser.
        </div>
        </div>
      </div>
      <div className="mt-30 pt-5">
        <div className="w-[100%] flex flex-col items-center h-full gap-12 absolute pb-5">

        <div className="flex flex-col items-center gap-7">
          <div className="text-[3.2rem] font-bold"><AuroraText colors={["#FF6EC7","#FEE440","#32FFE0","#A084E8","#FCA5F1","#5EEAD4","#F8FAFC"]}>"Work smarter. Write quicker. Achieve more"</AuroraText></div>
          <div className="font-semibold text-[2.5rem] mt-25">With...</div>
        </div>
          <div className="font-audiowide text-[13rem] text-[#a9a6a6] w-full text-center mt-27">
           LETSNOTE
          </div>
        </div>
          <Particles className="w-[100%] h-full"/>
       
        </div>
    </div>
  
    </>
  )
}

export default LandingHome