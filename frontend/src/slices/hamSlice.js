import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const hamSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
     setHamNav:(state,action)=>{
            state.value = action.payload
     }
    },
  })
  

  export const {setHamNav} = hamSlice.actions
  
  export default hamSlice.reducer