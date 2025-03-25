import { useSelector } from "react-redux";
import CreateModal from "./CreateModal";
import LeftSideBar from './LeftSideBar'
import Note from './Note.jsx'
const NotesPage = () => {
  const showCreateModal = useSelector(state => state.showCreateModal.value)
  const notes=useSelector(state=>state.user.notes)
  
  return (
    <div className='flex'>
    <LeftSideBar />
    <div className="h-[calc(90vh+16px)] relative w-full top-[2.74rem] ml-20">
    {showCreateModal && <CreateModal />}
    <div className=" flex flex-wrap gap-3 mx-4 my-7">
    {
         
         notes.map((note,index)=>{
          
          return <Note key={index} note={note}/>
         })
       }
      
    </div>
    </div>
  </div>
  )
}

export default NotesPage