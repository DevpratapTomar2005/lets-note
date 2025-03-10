

const Todo = () => {
  return (
    <div className="py-7 px-3 outline-2 w-[300px] my-2 rounded-md" >
        <div className="flex gap-3">
        <input type="checkbox" name="taskCheck" id="taskCheck" className="" />
        <span><h2>Do your task!</h2></span>
        </div>
    </div>
  )
}

export default Todo