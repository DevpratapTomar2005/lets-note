import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../slices/loginSlice.js'
import userReducer from '../slices/userSlice.js'
export const store = configureStore({
  reducer: {
    login:loginReducer,
    user:userReducer
  },
})