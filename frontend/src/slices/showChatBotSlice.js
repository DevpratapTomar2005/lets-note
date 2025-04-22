import {createSlice} from '@reduxjs/toolkit'

const initialState={
    showChatBot:false
}

const showChatBotSlice=createSlice({
name:'showChatBot',
initialState,
reducers:{
    setShowChatBot:(state,action)=>{
        state.showChatBot=action.payload
    }
}
})

export const {setShowChatBot}=showChatBotSlice.actions
export default showChatBotSlice.reducer