import { createSlice } from '@reduxjs/toolkit';

export const formSlice = createSlice({
  name: 'form',
  initialState: 
  [
    {
      id: "-1",
      formName: "User Profile",
      formCode: "user-profile",
      userType: "borrower",
      email: "ian.public@yahoo.com",
      password: "Test-123",
      firstName: "Ian",
      middleName: "Seaton",
      lastName: "Riley",
      address1: "125 Trenton St.",
      address2: "",
      city: "Buena Vista",
      state: "CO",
      zip: "81211",
      zipPlus4: "",
      title: "CTO / Founder",
      profile: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: "",
    },
    {
      id: "0",
      formName: "Eligibility Restricted Activities",
      formCode: "restricted",
      //restricted: null,
      restricted: false,
    },
    {
      id: "1",
      formName: "Eligibility For Profit",
      formCode: "forprofit",
      //forProfit: null,
      forProfit: true,
    },
    {
      id: "2",
      formName: "Profile > Business",
      formCode: "business-profile",
      //fein: "",
      fein: "123456789",
      tin: "",
      ssn: "",
      idType: "fein",
      businessName: "ABC Corporation",
      dba: "ABCo",
    },
    {
      id: "3",
      formName: "Profile > Business Address",
      formCode: "business-address",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      zipPlus4: "",
    },
    {
      id: "4",
      formName: "Profile > Verify",
      formCode: "profile-verify",
      agree: null,
    },
  ],
  reducers: {
    update: (state, action) => {
      //console.log('updateForm: action',action)
      //console.log('updateForm: state',state)
      switch(action.payload.id) {
        case "0":
          state[action.payload.id].restricted = action.payload.restricted
          break
        case "1":
          state[action.payload.id].forProfit = action.payload.forProfit
          break
        case "2":
          state[action.payload.id].fein = action.payload.fein
          state[action.payload.id].tin = action.payload.tin
          state[action.payload.id].ssn = action.payload.ssn
          state[action.payload.id].idType = action.payload.idType
          state[action.payload.id].businessName = action.payload.businessName
          state[action.payload.id].dba = action.payload.dba
          break
        case "3":
          console.log('updateForm: action',action)
          state[action.payload.id].address1 = action.payload.address1
          state[action.payload.id].address2 = action.payload.address2
          state[action.payload.id].city = action.payload.city
          state[action.payload.id].state = action.payload.state
          state[action.payload.id].zip = action.payload.zip
          state[action.payload.id].zipPlus4 = action.payload.zipPlus4
          break
        default:
          console.log('reducer action not found')
      }   
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