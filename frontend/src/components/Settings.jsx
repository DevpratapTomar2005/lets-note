import LeftSideBar from "./LeftSideBar"
import { useSelector } from "react-redux";
import CreateModal from "./CreateModal";
const Settings = () => {
    const showCreateModal = useSelector(state => state.showCreateModal.value)
  return (
    <div className="flex">
    <LeftSideBar/>
    <div className="h-[calc(90vh+16px)] relative w-full top-[2.74rem] ml-20">
    {showCreateModal && <CreateModal />}
     this is the settings page
    </div>
    </div>
  )
}

export default Settings