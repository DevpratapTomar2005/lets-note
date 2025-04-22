

import LeftSideBar from "../components/LeftSideBar";
import Dashboard  from "../components/Dashboard";
import AiChatbot from "./AiChatbot";
function UserHome() {

  return (
    
      <div className="flex">
        <LeftSideBar/>
        <Dashboard/>
        <AiChatbot/>
      </div>
      
    
  );
}

export default UserHome;
