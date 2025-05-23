import {createSlice} from '@reduxjs/toolkit'


const initialState={
    fullname:'',
    email:'',
    todos:[],
    notes:[],
    fcmToken:'',
    pfp:""
}

const userSlice=createSlice({

    name:'user',
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.fullname=action.payload.fullname
            state.email=action.payload.email
            state.todos=action.payload.todos
            state.notes=action.payload.notes
            state.pfp=action.payload.pfp
        },
        setTodos:(state,action)=>{
          state.todos=[...state.todos,action.payload]
        },
        setNotes:(state,action)=>{
            state.notes=[...state.notes,action.payload]
        },
        setFCMToken:(state,action)=>{
            state.fcmToken=action.payload
        },
        deleteStoreTodo:(state,action)=>{
            state.todos=state.todos.filter((todo)=>todo._id!==action.payload)
        },
        setTodoCompletion:(state,action)=>{
            state.todos=state.todos.map((todo)=>todo._id===action.payload.id?{...todo,completed:action.payload.completed}:todo)
        },

        deleteStoreNote:(state,action)=>{
            state.notes=state.notes.filter((note)=>note._id!==action.payload)
        },

        updateStoreNote:(state,action)=>{
            state.notes.filter((note)=>note._id===action.payload.id)[0].content=action.payload.content
        },
        setPfp:(state,action)=>{
            state.pfp=action.payload
    
    } 
}  
})

export const {setUser,setTodos,setNotes,setFCMToken,deleteStoreTodo,setTodoCompletion,deleteStoreNote,updateStoreNote,setPfp}=userSlice.actions
export default userSlice.reducer