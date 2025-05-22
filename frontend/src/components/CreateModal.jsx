import React from "react";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { setShowCreateModal } from "../slices/showCreateModal";
import { useMutation } from "@tanstack/react-query";
import { createTodo,createNote } from "../services/apiCalls";
import { refreshUserToken } from "../services/apiCalls";
import { isLoggedIn } from "../slices/loginSlice";
import { setTodos,setNotes } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateModal = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
   
  const [task, setTask] = useState("todo");

  const [todoTask, setTodoTask] = useState("");

  const [dueDate, setDueDate] = useState("");

  const [noteTitle, setNoteTitle] = useState("");

  const [wantNotification, setWantNotification] = useState(true);

  const [notificationTime, setNotificationTime] = useState("");

  const fcmToken=useSelector(state=>state.user.fcmToken)
 
    const {mutate,isPending:todoIsCreating} = useMutation({
        mutationFn:async(data)=>{
            return await createTodo({data})
        },
        onSuccess:(response)=>{
            dispatch(setTodos(response.data.todo))
            setTimeout(()=>{
              dispatch(setShowCreateModal(false))
              
            },400)
            
        },
        onError:async(error,data)=>{
            if(error.status===401){
              await refreshUserToken()
              try {
                mutate(data)
              } catch (error) {
                dispatch(isLoggedIn(false))
                navigate('/login')
               toast.error('User Logged Out!')
              }
            }
            else{

              toast.error(`${error.response.data.message}`)
            }
        }
    })
   
    const {mutate:creatingNote, isPending:noteIsCreating}=useMutation({
      mutationFn:async(title)=>{
        return await createNote(title)
      },
      onSuccess:(response)=>{
        dispatch(setNotes(response.data.note))
        setTimeout(()=>{
          dispatch(setShowCreateModal(false))
        },400)
        setTimeout(()=>{
          navigate(`/note/${response.data.note._id}`)
        },700)
      },
      onError:async(error,title)=>{
        if(error.status===401){
          await refreshUserToken()
        try {
            creatingNote(title)
        } catch (error) {
          dispatch(isLoggedIn(false))
           navigate('/login')
          toast.error('User Logged Out!')
        }
          
        }
       else{
        toast.error(`${error.response.data.message}`)
       }
      }
    })
    
    const createHandler=()=>{
        if(task==='todo'){
            let todoData={
              title:todoTask,
              dueDate:dueDate,
              notifyMe:wantNotification,
              notificationTime:notificationTime,
              deviceToken:fcmToken || ""
            }
          mutate({todoData})
               
    }
    if(task==='notes'){
      creatingNote(noteTitle)
    }
    
}

  return (
    <div className="w-[100vw] border-2 h-full fixed  flex justify-center items-center z-10">
      <div
        className={`fixed z-10 w-1/3 min-w-[350px] create-modal bg-white shadow-2xl rounded-lg ${
          wantNotification === true ? `${task==="notes"?("top-[25%]"):("top-[12%]")}` : `${task==="notes"?("top-[25%]"):("top-[18%]")}`
        }  mr-15 border-2  border-neutral-500 px-8 py-4`}
      >
        <label htmlFor="selectTasks" className="text-xl text-neutral-700 font-medium">
          Create:{" "}
        </label>
        <select
          name="selectTasks"
          id="selectTasks"
          className="outline-2 text-neutral-700 ml-2  py-1 rounded outline-neutral-700 focus:outline-neutral-600"
          onChange={(e) => setTask(e.target.value)}
        >
          <option value="todo">Todo</option>
          <option value="notes">Notes</option>
        </select>
        {task === "todo" ? (
          <div className="flex flex-col gap-8 mt-8">
            <div>
              <label htmlFor="title" className="text-lg text-neutral-700 font-medium">
                Task:{" "}
              </label>
              <input
                type="text"
                name="title"
                id="title"
                onChange={(e) => {
                  setTodoTask(e.target.value);
                }}
                className="p-2 text-md outline-2 text-neutral-800 rounded outline-neutral-700 focus:outline-neutral-600 w-full my-2"
              />
            </div>
            <div>
              <label htmlFor="dueDate" className="text-lg text-neutral-700 font-medium">
                Due Date:{" "}
              </label>
              <input
                type="date"
                name="dueDate"
                id="dueDate"
                className="outline-2 p-1 rounded outline-neutral-700 focus:outline-neutral-600"
                onChange={(e) => {
                  setDueDate(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="selectNotifyMe" className="text-lg text-neutral-700 font-medium">
                Notify Me:{" "}
              </label>
              <select
                name="selectNotifyMe"
                id="selectNotifyMe"
                className="outline-2 py-1 rounded outline-neutral-700 focus:outline-neutral-600"
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
                  className="text-lg text-neutral-700 font-medium"
                >
                  Notification Time:{" "}
                </label>
                <input
                  type="time"
                  name="notificationTime"
                  id="notificationTime"
                
                  className="outline-2 p-1 rounded text-neutral-800 outline-neutral-700"
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
            <label htmlFor="title" className="text-lg text-neutral-700 font-medium">
              Title:{" "}
            </label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={(e) => {
                setNoteTitle(e.target.value);
              }}
              className="p-2 text-md outline-2 rounded text-neutral-800 outline-neutral-700 focus:outline-neutral-600 w-full "
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
                (todoIsCreating||noteIsCreating)?'Creating...':`Create ${task === "todo" ? "Todo" : "Note"}`
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
