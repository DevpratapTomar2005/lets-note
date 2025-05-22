import deleteTodoImg from '../assets/icons and logos/delete.svg'
import {Link,useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {useMutation} from '@tanstack/react-query'
import { deleteStoreNote } from '../slices/userSlice'
import { deleteNote } from '../services/apiCalls'
import { toast } from 'react-toastify'
const Note = ({note}) => {
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const {mutate:deletingNote}=useMutation({
    mutationFn: async(id)=>{
      
      return await deleteNote(id)
    },
    onSuccess:(response)=>{
      
      dispatch(deleteStoreNote(response.data.id))
     
      
    },
    onError:async(error,id)=>{
       if(error.response.status==401){
         await refreshUserToken()
           try {
             deletingNote(id)

           } catch (error) {
             dispatch(isLoggedIn(false));
              navigate("/login");
              toast.error('Logged out successfully!');
           }
          }
          else{
            toast.error(`${error.response.data.message}`);
          }
    }
   })
  
   
   const deleteNoteHandler=(noteid)=>{
    
    deletingNote(noteid)
   }
  return (
    <div className="flex flex-col justify-between pt-3 pb-1 px-2 outline-2 outline-purple-800 h-[100%] w-[300px] my-2 rounded-md" >
        <div className="flex justify-between items-center">
       
            <div className="flex gap-2"> 
            <span className="text-purple-600 w-[230px] font-medium text-lg hover:underline hover:cursor-pointer"><Link to={`/note/${note._id}`}><h2>{note.title}</h2></Link></span>
            </div>
            <div className='p-1 hover:bg-gray-100 rounded-full' onClick={()=>deleteNoteHandler(note._id)} > 
            <img src={deleteTodoImg} className='w-[23px] opacity-[0.8]' alt="delete" />
            </div>
         </div>
          <div className='mt-3 flex justify-between'>
           <span className='text-[11px] text-purple-400 cursor-default hover:text-purple-700'>created at: {new Date(note.createdAt).toLocaleDateString('en-IN')}</span>
           <span className='text-[11px] text-purple-400 cursor-default hover:text-purple-700'>updated at: {new Date(note.updatedAt).toLocaleDateString('en-IN')}</span>
          </div>
    </div>
  )
}

export default Note