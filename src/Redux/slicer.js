import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'data',
  initialState: {
    _____something: 0
  },
  reducers: {
    updateState: (state, action) => {
      state[action.payload.key] = action.payload.value
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateState } = counterSlice.actions

export default counterSlice.reducer
