import { createSlice } from '@reduxjs/toolkit'

const menu = createSlice({
  name: 'menu',

  initialState: {
    rect: {},
    canvas: false
  },
  reducers: {
    setMenuRect(state, { payload }) {
      const { rect, canvas } = payload
      state.rect.top = rect.top
      state.rect.left = rect.left
      if (canvas !== undefined) state.canvas = canvas
    }
  }
})

export const { setMenuRect } = menu.actions

export default menu.reducer
