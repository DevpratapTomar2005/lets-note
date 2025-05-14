

import LeftSideBar from "../components/LeftSideBar";
import Dashboard  from "../components/Dashboard";


function UserHome() {

  return (
    
      <div className="flex">
        <LeftSideBar/>
        <Dashboard/>
     
      </div>
      
    
  );
}

export default UserHome;
