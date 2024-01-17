import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slicer'
export default configureStore({
  reducer: {
    data: counterReducer
  }
})
