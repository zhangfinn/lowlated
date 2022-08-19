import { configureStore } from '@reduxjs/toolkit'
import global from './slices/global'
import menu from './slices/menu'
import page from './slices/page'

const store = configureStore({
  reducer: {
    global,
    menu,
    page
  },
  middleware: getDefaultMiddleware => [...getDefaultMiddleware({ serializableCheck: false })]
})

export default store
