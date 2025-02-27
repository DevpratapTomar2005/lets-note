import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
     isLoggedIn:(state,action)=>{
            state.value = action.payload
     }
    },
  })
  

  export const {isLoggedIn} = loginSlice.actions
  
  export default loginSlice.reducer