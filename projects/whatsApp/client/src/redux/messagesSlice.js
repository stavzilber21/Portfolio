import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  messages: []
  }

  const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        load(state,action){
            state.messages = action.payload
        }
    }
  })

export const messagesActions = messagesSlice.actions; 
export default messagesSlice.reducer;