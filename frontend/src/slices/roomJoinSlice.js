import {createSlice} from '@reduxjs/toolkit'

const initialState={
    joinedRoom:false
}

const joinedRoomSlice=createSlice({
name:'joinedRoom',
initialState,
reducers:{
    setJoinedRoom:(state,action)=>{
        state.joinedRoom=action.payload
    }
}
})

export const {setJoinedRoom}=joinedRoomSlice.actions
export default joinedRoomSlice.reducer 