import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
const NoteEditPage = () => {
    const notes=useSelector(state=>state.user.notes)
   
    const {noteId}=useParams()
   
    const note=notes.filter((n)=>n._id==noteId)[0]
    
  return (
    <div className="relative top-[2.74rem]">
        <div>Title:{note.title}</div>
        <div>content:{note.content}</div>
    </div>
  )
}

export default NoteEditPage