import { createSlice } from '@reduxjs/toolkit';

export const formSlice = createSlice({
  name: 'form',
  initialState: {
    formId: "0",
    percentComplete: 0,
    userId: "1",
    userType: "borrower",
    email: "ian.public@yahoo.com",
    password: "Test-123",
    firstName: "Ian",
    middleName: "Seaton",
    lastName: "Riley",
    userAddress1: "125 Trenton St.",
    userAddress2: "",
    userCity: "Buena Vista",
    userState: "CO",
    userZip: "81211",
    userZipPlus4: "",
    title: "CTO / Founder",
    profile: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: "",
    sevenAwareAgree: null,
    lenderEmail: "riley.internet@gmail.com  ",
    lenderPassword: "Test-123",
    lenderFirstName: "Sam",
    lenderMiddleName: "Samuel",
    lenderLastName: "Samuelson",
    lenderUserAddress1: "742 Evergreen Terrace",
    lenderUserAddress2: "",
    lenderUserCity: "Springfield",
    lenderUserState: "MI",
    lenderUserZip: "48170",
    lenderUserZipPlus4: "",
    lenderTitle: "Origniation Specialist",
    lenderProfile: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    lenderImage: "",    
    restricted: null,
    forProfit: null,
    fein: "",
    tin: "",
    ssn: "",
    idType: "fein",
    businessName: "",
    dba: "",
    businessAddress1: "",
    businessAddress2: "",
    businessCity: "",
    businessState: "",
    businessZip: "",
    businessZipPlus4: "",
    agreeLexisNexis: false,
  },
  reducers: {
    setFormId: (state, action) => {
      state.formId = action.payload;
    },
    update: (state, action) => {
      console.log('updateForm: action',action)
      //console.log('updateForm: state',state)
      switch(action.payload.formId) {
        case "-1":
          state.firstName = action.payload.firstName
          state.lastName = action.payload.lastName
          state.userAddress1 = action.payload.userAddress1
          state.userAddress2 = action.payload.userAddress2
          state.userCity = action.payload.userCity
          state.userState = action.payload.userState
          state.userZip = action.payload.userZip
          state.userZipPlus4 = action.payload.userZipPlus4
          state.title = action.payload.title
          state.profile = action.payload.profile
          state.image = action.payload.image
          break
        case "0":
          state.restricted = action.payload.restricted
          state.percentComplete = action.payload.percentComplete
          break
        case "1":
          state.forProfit = action.payload.forProfit
          state.percentComplete = action.payload.percentComplete
          break
        case "2":
          state.fein = action.payload.fein
          state.tin = action.payload.tin
          state.ssn = action.payload.ssn
          state.idType = action.payload.idType
          state.businessName = action.payload.businessName
          state.dba = action.payload.dba
          state.percentComplete = action.payload.percentComplete
          break
        case "3":
          state.businessAddress1 = action.payload.businessAddress1
          state.businessAddress2 = action.payload.businessAddress2
          state.businessCity = action.payload.businessCity
          state.businessState = action.payload.businessState
          state.businessZip = action.payload.businessZip
          state.businessZipPlus4 = action.payload.businessZipPlus4
          state.percentComplete = action.payload.percentComplete
          break
        case "4":
          state.agreeLexisNexis = action.payload.agreeLexisNexis
          state.percentComplete = action.payload.percentComplete
          break
        default:
          console.log('reducer action not found')
      }   
    },
  },
});

export const { update, setFormId } = formSlice.actions;

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