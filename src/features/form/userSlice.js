import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: "-1",
    percentComplete: 0,
    loanAmount: 0,
    stage: "Not Started",
    stageHeader: "Get Started",
    stageText: "Get Started",
    stageNavigate: "/admin/restricted",
    stageNavigateText: "Click to Continue",
    form: null,
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload
    },
    setForm: (state, action) => {
      state.form = action.form
    },
    update: (state, action) => {
        //console.log('updateborrower: action',action)        
        state.percentComplete = action.payload.percentComplete 
        state.loanAmount = action.payload.loanAmount
        state.stage = action.payload.stage
        state.stageHeader = action.payload.stageHeader
        state.stageText = action.payload.stageText
        state.stageNavigate = action.payload.stageNavigate
        state.stageNavigateText = action.payload.stageNavigateText
    },
  },
});

export const { update, setUserId } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUser = state => state.user;

export default userSlice.reducer;