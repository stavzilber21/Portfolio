import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: []
  }

  const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        load(state,action){
            state.user = action.payload
        }
    }
  })

export const userActions = userSlice.actions; 
export default userSlice.reducer;