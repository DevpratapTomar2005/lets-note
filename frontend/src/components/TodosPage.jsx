import { useSelector } from "react-redux";
import CreateModal from "./CreateModal";
import LeftSideBar from './LeftSideBar'
import Todo from "./Todo.jsx";
const TodosPage = () => {
  const showCreateModal = useSelector(state => state.showCreateModal.value)
  return (
    <div className='flex'>
      <LeftSideBar />
      <div className="h-[calc(90vh+16px)] relative w-full top-[2.74rem] ml-20">
      {showCreateModal && <CreateModal />}
      <div className=" flex flex-wrap gap-3 mx-4 my-7">
        <Todo/>
        
      </div>
      </div>
    </div>
  )
}

export default TodosPage