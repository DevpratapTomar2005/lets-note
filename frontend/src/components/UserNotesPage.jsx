import LeftSideBar from "./LeftSideBar";
import NotesPage  from "./NotesPage";


function UserNotesPage() {

  return (
    
      <div className="flex h-[100vh] bg-white" >
        <LeftSideBar/>
        <NotesPage/>
     
      </div>
      
    
  );
}

export default UserNotesPage;