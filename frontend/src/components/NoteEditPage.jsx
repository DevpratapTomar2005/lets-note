import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
const NoteEditPage = () => {
    const notes=useSelector(state=>state.user.notes)
   
    const {noteId}=useParams()
   
    const note=notes.filter((n)=>n._id==noteId)
    
  return (
    <div className="relative top-[2.74rem]">
        <div>Title:{note[0].title}</div>
        <div>content:{note[0].content}</div>
    </div>
  )
}

export default NoteEditPage