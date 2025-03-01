import { useSelector } from "react-redux";
import CreateModal from "./CreateModal";
import LeftSideBar from './LeftSideBar'

const TodosPage = () => {
  const showCreateModal = useSelector(state => state.showCreateModal.value)
  return (
    <div className='flex'>
      <LeftSideBar />
      <div className="h-[calc(90vh+16px)] relative w-full top-[2.74rem] ml-20">
      {showCreateModal && <CreateModal />}
      <div>
        This is todo page
      </div>
      </div>
    </div>
  )
}

export default TodosPage