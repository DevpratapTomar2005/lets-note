import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setShowCreateModal } from "../slices/showCreateModal";
import { useMutation } from "@tanstack/react-query";
import { createTodo } from "../services/apiCalls";
import { refreshUserToken } from "../services/apiCalls";
import { isLoggedIn } from "../slices/loginSlice";
import { setTodos,setNotes } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const CreateModal = () => {
    const navigate = useNavigate();
    
  const [task, setTask] = useState("todo");

  const [todoTask, setTodoTask] = useState("");

  const [dueDate, setDueDate] = useState("");

  const [noteTitle, setNoteTitle] = useState("");

  const [wantNotification, setWantNotification] = useState(true);

  const [notificationTime, setNotificationTime] = useState("");
  const dispatch = useDispatch();

    const {mutate,isPending} = useMutation({
        mutationFn:async(data)=>{
            return await createTodo({data})
        },
        onSuccess:(response)=>{
            dispatch(setTodos(response.data.todo))
            toast.success(`${response.data.message}`)
        },
        onError:async(error)=>{
            if(error.status===401){
                await refreshUserToken().then(
                    await createTodo().then((secondRes)=>{
                        dispatch(setTodos(secondRes.data.todo))
                        toast.success(`${secondRes.data.message}`)
                    }
                )
                ).catch((error)=>{
                    dispatch(isLoggedIn(false)),
                    navigate('/login'),
                    toast.error('Logged out successfully!')
                })
            }
            toast.error(`${error.response.data.message}`)
        }
    })

    const createHandler=()=>{
        if(task==='todo'){
            let todoData={
                title:todoTask,
                dueDate:dueDate,
                notifyMe:wantNotification,
                notificationTime:notificationTime
            }
            mutate({todoData})
    }
    
}

  return (
    <>
      <div
        className={`fixed z-10 w-1/3 bg-white shadow-2xl rounded-lg ${
          wantNotification === true ? "top-[12%]" : "top-[18%]"
        } right-[32%] border-2  border-black px-8 py-4`}
      >
        <label htmlFor="selectTasks" className="text-xl font-medium">
          Create:{" "}
        </label>
        <select
          name="selectTasks"
          id="selectTasks"
          className="outline-1 py-1 rounded outline-black focus:outline-black"
          onChange={(e) => setTask(e.target.value)}
        >
          <option value="todo">Todo</option>
          <option value="notes">Notes</option>
        </select>
        {task === "todo" ? (
          <div className="flex flex-col gap-8 mt-8">
            <div>
              <label htmlFor="title" className="text-lg font-medium">
                Task:{" "}
              </label>
              <input
                type="text"
                name="title"
                id="title"
                onChange={(e) => {
                  setTodoTask(e.target.value);
                }}
                className="p-2 text-md outline-1 rounded outline-black focus:outline-black w-full my-2"
              />
            </div>
            <div>
              <label htmlFor="dueDate" className="text-lg font-medium">
                Due Date:{" "}
              </label>
              <input
                type="date"
                name="dueDate"
                id="dueDate"
                className="outline-1 p-1 rounded outline-black focus:outline-black"
                onChange={(e) => {
                  setDueDate(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="selectNotifyMe" className="text-lg font-medium">
                Notify Me:{" "}
              </label>
              <select
                name="selectNotifyMe"
                id="selectNotifyMe"
                className="outline-1 py-1 rounded outline-black focus:outline-black"
                onChange={(e) => setWantNotification(JSON.parse(e.target.value))}
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>

            {(wantNotification ==true) ? (
              <div>
                <label
                  htmlFor="notificationTime"
                  className="text-lg font-medium"
                >
                  Notification Time:{" "}
                </label>
                <input
                  type="time"
                  name="notificationTime"
                  id="notificationTime"
                  className="outline-1 p-1 rounded outline-black focus:outline-black"
                  onChange={(e) => {
                    setNotificationTime(e.target.value);
                  }}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <div className="mt-5">
            <label htmlFor="title" className="text-lg font-medium">
              Title:{" "}
            </label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={(e) => {
                setNoteTitle(e.target.value);
              }}
              className="p-2 text-md outline-1 rounded outline-black focus:outline-black w-full "
            />
          </div>
        )}

        <div className="flex justify-end items-center gap-4 mt-10">
          <button
            className="font-medium text-md hover:text-gray-800"
            onClick={() => {
              dispatch(setShowCreateModal(false));
            }}
          >
            Cancel
          </button>
          <button className="bg-purple-600 text-white p-2 rounded-md hover:bg-purple-500" onClick={()=>createHandler()}>
            {
                (isPending)?'Creating...':`Create ${task === "todo" ? "Todo" : "Note"}`
            }
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateModal;
