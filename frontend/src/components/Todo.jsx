import deleteTodo from '../assets/icons and logos/delete.svg'
import clock from '../assets/icons and logos/clock.svg'
import { useState } from 'react'
const Todo = ({todo}) => {
const [markComplete,setMarkComplete]=useState(false)
 const onCheckHandler=()=>{
 setMarkComplete(!markComplete)
 }
 
  return (
    
    <div className="pt-7 pb-1 px-3 outline-2 outline-purple-800 w-[300px] my-2 rounded-md" >
      <div className="flex justify-between items-center">

        <div className="flex gap-2">
        <input type="checkbox" name="taskCheck" id="taskCheck" onChange={()=>onCheckHandler()} className="accent-purple-500 w-[18px]" />
        <span className="text-purple-600"><h2 className={markComplete?'line-through': null}>{todo.title}</h2></span>
        </div>
        <div className='p-1 hover:bg-gray-100 rounded-full'>
          <img src={deleteTodo} className='w-[20px] opacity-[0.8]' alt="verticle dots" />
        </div>
      </div>
      <div className='mt-3 flex justify-between'>
      {
            (todo.notifyMe)?( <div className='flex  opacity-[0.5] hover:opacity-[1]'>
          
              <img src={clock} className='w-[16px]' alt="clock" />
              <span className='text-sm text-purple-700 mx-1'>{todo.notificationTime}</span>
              </div>):(<div></div>)
          }
        <span className='text-sm text-purple-400 hover:text-purple-700'>{new Date(todo.dueDate).toLocaleDateString('en-IN')}</span>
      </div>
    </div>
    
  )
}

export default Todo