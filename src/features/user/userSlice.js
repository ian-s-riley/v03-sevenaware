import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: "0",
    userType: null,
    email: "",
    password: "",
    password: "",
    firstName: "",
    middleName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    title: "",
    profile: "",
    image: "",
  },
  reducers: {
    update: (state, action) => {
      console.log('updateUser: action',action)
      //console.log('updateUser: state',state)
      state.userType = action.payload.userType
      state.email = action.payload.email
      state.password = action.payload.password
      state.firstName = action.payload.firstName
      state.middleName = action.payload.middleName
      state.lastName = action.payload.lastName
      state.address1 = action.payload.address1
      state.address2 = action.payload.address2
      state.city = action.payload.city
      state.state = action.payload.state
      state.zip = action.payload.zip
      state.title = action.payload.title
      state.profile = action.payload.profile      
      state.image = action.payload.image
    },
  },
});

export const { update } = userSlice.actions;

// The function below is called a thunk and allows us to peruser async logic. It
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
export const selectUser = state => state.user;

export default userSlice.reducer;