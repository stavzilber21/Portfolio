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
        addMessageToRedux: (state, action) => {
          // Add a new message
          if (state.selectedChat ) {
            state.selectedChat.messages.push(action.payload);
          }
        },
      },
  });

export const { selectChat , addMessageToRedux} = chatSlice.actions;
export default chatSlice.reducer;