import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../slices/loginSlice.js'

export const store = configureStore({
  reducer: {
    login:loginReducer},
})