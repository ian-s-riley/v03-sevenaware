import { createSlice } from '@reduxjs/toolkit';

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    // userId: "70213c91-7f7a-4790-8146-cb26cb13daf8",    
    // userName: "Ian R.", 
    // userType: "Borrower",
    // formId: "e104bf37-209c-4e92-b0b0-661503743244",    

    userName: "Mike B.", 
    userType: "Lender",
    userId: "96e2c4aa-f2e2-4fde-b66e-7459a04d93f8",    
    formId: "",    
  },
  reducers: {
    updateNavigation: (state, action) => {
      state.userId = action.payload.userId
      state.userName = action.payload.userName
      state.userType = action.payload.userType
      state.formId = action.payload.formId
    },
  },
});

export const { updateNavigation } = navigationSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectNavigation = state => state.navigation

export default navigationSlice.reducer;