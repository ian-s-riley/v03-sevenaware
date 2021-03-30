import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../features/form/formSlice';
import navigationReducer from '../features/form/navigationSlice';

export default configureStore({
  reducer: {
    form: formReducer,
    navigation: navigationReducer,
  },
});
