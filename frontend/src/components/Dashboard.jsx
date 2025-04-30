
import { useSelector,useDispatch } from "react-redux";
import CreateModal from "./CreateModal";
import { setFCMToken } from "../slices/userSlice";
import { requestFCMToken } from "../services/firebase";
import { useEffect } from "react";
import Todo from '../components/Todo.jsx'
import Note from '../components/Note.jsx'
const Dashboard = () => {
  const showCreateModal = useSelector(state => state.showCreateModal.value)
  const todos=useSelector(state=>state.user.todos)
  const notes=useSelector(state=>state.user.notes)
  const dispatch=useDispatch()
  useEffect(()=>{
    const generatingFcmToken=async()=>{

      const token = await requestFCMToken();
  
      dispatch(setFCMToken(token))
      
    }
    generatingFcmToken()
  },[])
  
  let currentMonth=new Date().getMonth()+1
  return (
    <div className="h-[calc(90vh+16px)] bg-white relative w-full top-[2.74rem] ml-20">
      {showCreateModal && <CreateModal />}
      <div className="upcoming-tasks my-12 mx-22">
        <div className="flex items-center">
          <span className="text-gray-500 font-roboto text-3xl">Upcoming Tasks</span>
          
        </div>
        <div className=" flex flex-wrap gap-3 mx-13 my-7">
        {
          todos&&todos.length>0?(

            todos.map((todo,index)=>{
             
              if(new Date(todo.dueDate).getMonth()+1==currentMonth){
  
                return <Todo key={index} todo={todo}/>
              }
            })
          ):(
            <span className="text-gray-500 font-roboto text-sm">No Upcoming Tasks</span>
          )
         
        }
        
      </div>
      </div>
      <div className="recent-notes my-7 mx-22">
        <div className="flex items-center">
          <span className="text-gray-500 font-roboto text-3xl">Recent Notes</span>
          
        </div>
        <div className=" flex flex-wrap gap-3 mx-13 my-7">
        {

          notes&&notes.length>0?(
            notes.map((note,index)=>{
           
              if(new Date(note.createdAt).getMonth()+1==currentMonth || new Date(note.updatedAt).getMonth()+1==currentMonth){
  
                return <Note key={index} note={note}/>
              }
            })
          ):(
            <span className="text-gray-500 font-roboto text-sm">No Recent Notes</span>
          )
         
         
        }
        
      </div>
      </div>

    </div>
    
  );
};

export default Dashboard