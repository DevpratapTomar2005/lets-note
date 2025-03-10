import sortImg from "../assets/icons and logos/sort.svg";
import { useSelector,useDispatch } from "react-redux";
import CreateModal from "./CreateModal";
import { setFCMToken } from "../slices/userSlice";
import { requestFCMToken } from "../services/firebase";
import { useEffect } from "react";
const Dashboard = () => {
  const showCreateModal = useSelector(state => state.showCreateModal.value)
  const dispatch=useDispatch()
  useEffect(()=>{
    const generatingFcmToken=async()=>{

      const token = await requestFCMToken();
  
      dispatch(setFCMToken(token))
      
    }
    generatingFcmToken()
  })
  return (
    <div className="h-[calc(90vh+16px)] relative w-full top-[2.74rem] ml-20">
      {showCreateModal && <CreateModal />}
      <div className="upcoming-tasks my-7 mx-22">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-roboto text-2xl">Upcoming Tasks</span>
          <span className="hover:bg-gray-100 p-2 rounded-3xl">
            <img className="w-[25px]" src={sortImg} alt="sort" />
          </span>
        </div>
      </div>
      <div className="recent-notes my-7 mx-22">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-roboto text-2xl">Recent Notes</span>
          <span className="hover:bg-gray-100 p-2 rounded-3xl">
            <img className="w-[25px]" src={sortImg} alt="sort" />
          </span>
        </div>
      </div>

    </div>
  );
};

export default Dashboard