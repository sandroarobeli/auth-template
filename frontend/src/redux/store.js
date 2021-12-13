// Third party
import { configureStore } from '@reduxjs/toolkit';

// Custom
import userReducer from './userSlice'

const store = configureStore({
  reducer: {
    user: userReducer
  },
});


export default store
