
import LeftSideBar from "./LeftSideBar";
import TodosPage  from "./TodosPage";


function UserTodosPage() {

  return (
    
      <div className="flex">
        <LeftSideBar/>
        <TodosPage/>
     
      </div>
      
    
  );
}

export default UserTodosPage;
