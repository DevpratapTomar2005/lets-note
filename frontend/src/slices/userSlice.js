import {createSlice} from '@reduxjs/toolkit'


const initialState={
    fullname:'',
    email:'',
    todos:[],
    notes:[],
    fcmToken:''
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
        },
        setTodos:(state,action)=>{
            state.todos.push(action.payload)
        },
        setNotes:(state,action)=>{
            state.notes.push(action.payload)
        },
        setFCMToken:(state,action)=>{
            state.fcmToken=action.payload
        }
    }
})

export const {setUser,setTodos,setNotes,setFCMToken}=userSlice.actions
export default userSlice.reducer