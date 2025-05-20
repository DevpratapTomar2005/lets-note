
import LeftSideBar from "./LeftSideBar";
import TodosPage  from "./TodosPage";


function UserTodosPage() {

  return (
    
      <div className="flex h-[100vh] bg-white">
        <LeftSideBar/>
        <TodosPage/>
     
      </div>
      
    
  );
}

export default UserTodosPage;
