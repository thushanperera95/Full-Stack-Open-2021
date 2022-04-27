import { createSlice } from '@reduxjs/toolkit'

let timer

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notify(state, action) {
      return action.payload
    },
    reset() {
      return ''
    }
  }
})

export const { notify, reset } = notificationSlice.actions

export const setNotification = (message, timeIntervalSeconds) => {
  return async dispatch => {
    dispatch(notify(message))

    clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch(reset())
    }, timeIntervalSeconds * 1000)
  }
}

export default notificationSlice.reducer