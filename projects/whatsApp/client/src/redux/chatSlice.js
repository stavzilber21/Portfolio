import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selectedChat: null
  }

  const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        selectChat: (state, action) => {
          state.selectedChat = action.payload;
        },
        addMessage: (state, action) => {
          // Add a new message
          if (state.selectedChat ) {
            state.selectedChat.messages.push(action.payload);
          }
        },
      },
  });

export const { selectChat , addMessage} = chatSlice.actions;
export default chatSlice.reducer;