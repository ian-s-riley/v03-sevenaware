import { createSlice } from '@reduxjs/toolkit';

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    formId: 0,
  },
  reducers: {
    setFormId: (state, action) => {
      state.formId = action.payload;
    },
  },
});

export const { setFormId } = navigationSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectFormId = state => state.navigation.formId;

export default navigationSlice.reducer;