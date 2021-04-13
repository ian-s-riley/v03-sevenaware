import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../features/form/formSlice';
import userReducer from '../features/form/userSlice';

export default configureStore({
  reducer: {
    form: formReducer,
    user: userReducer,
  },
});
