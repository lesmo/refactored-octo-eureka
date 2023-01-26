import { configureStore } from '@reduxjs/toolkit';
import colorReducer from '../features/color/colorSlice';

export default configureStore({
  reducer: {
    color: colorReducer,
  },
});
