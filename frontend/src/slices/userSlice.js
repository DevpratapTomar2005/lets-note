import {createSlice} from '@reduxjs/toolkit'

const initialState={
    fullname:'',
    email:''
}

const userSlice=createSlice({

    name:'user',
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.fullname=action.payload.fullname
            state.email=action.payload.email
        }
    }
})

export const {setUser}=userSlice.actions
export default userSlice.reducer