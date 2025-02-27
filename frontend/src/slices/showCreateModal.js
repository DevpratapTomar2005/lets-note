import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value: false,
}

const showCreateModal = createSlice({
    name:'showCreateModal',
    initialState,
    reducers:{
        setShowCreateModal:(state,action)=>{
            state.value = action.payload
        }
    }
})

export const {setShowCreateModal}=showCreateModal.actions
export default showCreateModal.reducer