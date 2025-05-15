import { useSelector } from "react-redux";
import CreateModal from "./CreateModal";

import Note from './Note.jsx'
import AiChatbot from "./AiChatbot";
const NotesPage = () => {
  const showCreateModal = useSelector(state => state.showCreateModal.value)
  const notes=useSelector(state=>state.user.notes)
  
  return (
    <>
    
    <div className="h-[calc(90vh+16px)] relative w-full top-[2.74rem] notesPage ml-20">
    {showCreateModal && <CreateModal />}
    <div className=" flex flex-wrap gap-3 mx-4 my-7 notes-cont">
    {
         notes.length==0?(
          <div className="text-gray-400 text-md mx-auto my-50">No notes available.</div>
         ):(

           notes.map((note,index)=>{
            
            return <Note key={index} note={note}/>
           })
         )
       }
      
    </div>
    </div>
    <div>

    <AiChatbot/>
    </div>
  </>
  )
}

export default NotesPage