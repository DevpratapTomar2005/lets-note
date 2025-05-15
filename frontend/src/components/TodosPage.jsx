import { useSelector } from "react-redux";
import CreateModal from "./CreateModal";

import Todo from "./Todo.jsx";
import AiChatbot from "./AiChatbot";
const TodosPage = () => {
  const showCreateModal = useSelector(state => state.showCreateModal.value)
  const todos=useSelector(state=>state.user.todos)
 
  return (
   
    <>
   
      
      <div className="h-[calc(90vh+16px)] bg-white relative w-full top-[2.74rem] todoPage ml-20">
      {showCreateModal && <CreateModal />}
      <div className=" flex flex-wrap gap-3 mx-4 my-7 todo-cont">
        {
          todos.length==0?(
            <div className="mx-auto my-50 text-gray-400 text-md">No todos available.</div>
          ):(
            
            todos.map((todo,index)=>{
              return <Todo key={index} todo={todo}/>
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

export default TodosPage