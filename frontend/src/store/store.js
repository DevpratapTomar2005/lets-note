import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../slices/loginSlice.js'
import userReducer from '../slices/userSlice.js'
import showCreateModalReducer from '../slices/showCreateModal.js'
export const store = configureStore({
  reducer: {
    login:loginReducer,
    user:userReducer,
    showCreateModal:showCreateModalReducer
  },
})