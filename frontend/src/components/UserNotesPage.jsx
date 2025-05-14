import LeftSideBar from "./LeftSideBar";
import NotesPage  from "./NotesPage";


function UserNotesPage() {

  return (
    
      <div className="flex">
        <LeftSideBar/>
        <NotesPage/>
     
      </div>
      
    
  );
}

export default UserNotesPage;