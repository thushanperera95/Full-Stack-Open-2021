import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify(state, action) {
      const message = action.payload
      state = message
      return state
    },
    reset(state) {
      state = ''
      return state
    }
  }
})

export const { notify, reset } = notificationSlice.actions
export default notificationSlice.reducer