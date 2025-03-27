
import { useState } from "react";
import { useSelector , useDispatch} from "react-redux"
import { useParams ,useNavigate} from "react-router-dom"
import { Editor } from '@tinymce/tinymce-react';
import {useMutation} from '@tanstack/react-query'
import {updateNote,refreshUserToken} from '../services/apiCalls'
import { updateStoreNote } from "../slices/userSlice"
import { isLoggedIn } from "../slices/loginSlice"
import { toast } from "react-toastify";

const NoteEditPage = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const notes=useSelector(state=>state.user.notes)
  const {noteId}=useParams()
   
  const note=notes.filter((n)=>n._id==noteId)[0]
  const [editedContent,setEditedContent]=useState(note.content)
  
  const {mutate:editNote}=useMutation({
    mutationFn:async({id,content})=>{
      return await updateNote({id,content})
    },
    onSuccess:(response)=>{
      dispatch(updateStoreNote({id:response.data.id,content:response.data.content}))
    },
    onError:async(error,id,content)=>{
      if(error.status===401){
          try {
           await refreshUserToken()
           editNote({id,content})
           } catch (error) {
           dispatch(isLoggedIn(false))
           navigate('/login')
           toast.error('User Logged Out!')
           }
           }
           else{
           toast.error(`${error.response.data.message}`)
          }
    }
  })

  const handleEditorChange=(content)=>{
    
    editNote({id:note._id,content})
  }

  return (
    <div className="relative top-[2.74rem]">
        <div className="bg-white py-1 px-3 border-b-1 h-13 border-gray-300">{note.title}</div>
        {/* <div className="flex justify-center"><button className="py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-500" onClick={()=>handleEditorChange(editedContent)}>Save</button></div> */}
        <div>

        <Editor
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
        initialValue={note.content}
        init={{
          height: '83vh',
          branding: false,
          skin:'borderless',
          menubar: true,
          help_accessibility:false,
          
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 
            'charmap', 'preview', 'anchor', 'searchreplace', 
            'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
            
         
        }}
        
        onEditorChange={(editedText)=>setEditedContent(editedText)}
        />
        </div>
    </div>
  )
}

export default NoteEditPage