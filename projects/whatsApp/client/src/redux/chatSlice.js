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
      },
  });

export const { selectChat } = chatSlice.actions;
export default chatSlice.reducer;