import { createSlice } from '@reduxjs/toolkit';

export const formSlice = createSlice({
  name: 'form',
  initialState: [
    {
      id: "0",
      formName: "Form #0",
      formCode: "form-0",
      name: "",
      ssn: "",
    },
    {
      id: "1",
      formName: "Form #1",
      formCode: "form-1",
      address1: "",
      address2: "",
    }
  ],
  reducers: {
    update: (state, action) => {
      console.log('action',action)
      switch(action.payload.id) {
        case "0":
          state[action.payload.id].name = action.payload.name
          state[action.payload.id].ssn = action.payload.ssn
          break
        case "1":
          state[action.payload.id].address1 = action.payload.address1
          state[action.payload.id].address2 = action.payload.address2
          break
        default:
          console.log('reducer action not found')
      }      ;
    },
  },
});

export const { update } = formSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const updateAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectForm = state => state.form;

export default formSlice.reducer;