import deleteTodoImg from '../assets/icons and logos/delete.svg'
import clock from '../assets/icons and logos/clock.svg'

import {useDispatch} from 'react-redux'
import {deleteStoreTodo,setTodoCompletion} from '../slices/userSlice'
import { deleteTodo,refreshUserToken,taskCompleted } from '../services/apiCalls'
import {useMutation} from '@tanstack/react-query'
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom'
const Todo = ({todo}) => {


const dispatch=useDispatch()
const navigate=useNavigate()

const {mutate:completeTodo}=useMutation({
  mutationFn:async({id,completed})=>{
    return await taskCompleted({id,completed})
  },
  onSuccess:(response)=>{
    dispatch(setTodoCompletion({id:response.data.id,completed:response.data.completed}))
    
  },
  onError:async(error,completed)=>{
    if(error.response.status==401){
     try {
       await refreshUserToken()
       await taskCompleted(todo._id,completed)
         dispatch(setTodoCompletion({id:response.data.id,completed:response.data.completed}))
       
       
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

 const onCheckHandler=(id,completed)=>{
  
 completeTodo({id,completed})
 }

 const {mutate}=useMutation({
  mutationFn: async(id)=>{
    
    return await deleteTodo(id)
  },
  onSuccess:(response)=>{
    
    dispatch(deleteStoreTodo(response.data.id))
   
    
  },
  onError:async(error)=>{
    if (error.response.status == 401) {
            await refreshUserToken()
              .then(
                await deleteTodo(todo._id).then((response)=>{
                  dispatch(deleteStoreTodo(response.todo.id))
                  
                
                }   
                ).catch(
                  (error)=>{
                    toast.error('Error in deleting todo!')
                  }
                )
              )
              .catch(
                dispatch(isLoggedIn(false)),
                navigate("/login"),
                toast.error(`Logged out successfully!`)
              );
          }
  }
 })

 
 const deleteTodoHandler=(todoid)=>{
  
  mutate(todoid)
 }
 
 
  return (
    
    <div className="pt-7 flex flex-col justify-between pb-1 px-3 outline-2 outline-purple-800 h-[100%] w-[300px] my-2 rounded-md" >
      <div className="flex justify-between items-center">

        <div className="flex gap-2">
        <input type="checkbox" name="taskCheck" id="taskCheck" defaultChecked={(todo.completed)?true:false} onChange={()=>onCheckHandler(todo._id,!todo.completed)} className="accent-purple-500 w-[18px]" />
        <span className="text-purple-600 w-[200px]"><h2 className={todo.completed?'line-through': null}>{todo.title}</h2></span>
        </div>
        <div className='p-1 hover:bg-gray-100 rounded-full' onClick={()=>deleteTodoHandler(todo._id)}>
          <img src={deleteTodoImg} className='w-[22px] opacity-[0.8]' alt="delete" />
        </div>
      </div>
      <div className='mt-3 flex justify-between'>
      {
            (todo.notifyMe)?( <div className='flex opacity-[0.5] cursor-default hover:opacity-[1]'>
          
              <img src={clock} className='w-[16px]' alt="clock" />
              <span className='text-sm text-purple-700 mx-1'>{todo.notificationTime}</span>
              </div>):(<div></div>)
          }
        <span className='text-sm text-purple-400 cursor-default hover:text-purple-700'>{new Date(todo.dueDate).toLocaleDateString('en-IN')}</span>
      </div>
    </div>
    
  )
}

export default Todo