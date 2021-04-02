import { createSlice } from '@reduxjs/toolkit';

export const formSlice = createSlice({
  name: 'form',
  initialState: [
    {
      id: "0",
      formName: "Eligibility Restricted Activities",
      formCode: "restricted",
      restricted: null,
    },
    {
      id: "1",
      formName: "Eligibility For Profit",
      formCode: "forprofit",
      forProfit: null,
    },
    {
      id: "2",
      formName: "Business Profile",
      formCode: "business-profile",
      fein: "",
      tin: "",
      ssn: "",
      idType: "fein",
      businessName: "",
      dba: "",
    },
    {
      id: "3",
      formName: "Business Address",
      formCode: "business-address",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      county: "",
    }
  ],
  reducers: {
    update: (state, action) => {
      console.log('updateForm: action',action)
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
          state[action.payload.id].address1 = action.payload.address1
          state[action.payload.id].address2 = action.payload.address2
          state[action.payload.id].city = action.payload.city
          state[action.payload.id].state = action.payload.state
          state[action.payload.id].zip = action.payload.zip
          state[action.payload.id].county = action.payload.county
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