

import LeftSideBar from "../components/LeftSideBar";
import Dashboard  from "../components/Dashboard";


function UserHome() {

  return (
    
      <div className="flex bg-white h-[100vh]">
        <LeftSideBar/>
        <Dashboard/>
     
      </div>
      
    
  );
}

export default UserHome;
