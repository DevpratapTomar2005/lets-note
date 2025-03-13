import { useSelector } from "react-redux";
import CreateModal from "./CreateModal";
import LeftSideBar from './LeftSideBar'
import Todo from "./Todo.jsx";
const TodosPage = () => {
  const showCreateModal = useSelector(state => state.showCreateModal.value)
  const todos=useSelector(state=>state.user.todos)
 
  return (
    <div className='flex'>
      <LeftSideBar />
      <div className="h-[calc(90vh+16px)] bg-white relative w-full top-[2.74rem] ml-20">
      {showCreateModal && <CreateModal />}
      <div className=" flex flex-wrap gap-3 mx-4 my-7">
        {
          todos.map((todo)=>{
           return <Todo key={todo._id} todo={todo}/>
          })
        }
        
      </div>
      </div>
    </div>
  )
}

export default TodosPage