import { createSlice } from '@reduxjs/toolkit';

//AWS Amplify GraphQL libraries
import { API, graphqlOperation } from 'aws-amplify';
import { updateForm as updateFormMutation } from '../../graphql/mutations';

export const formSlice = createSlice({
  name: 'form',
  initialState: {
    stage: "",
    stageHeader: "",
    stageText: "",
    stageNavigate: "",
    stageNavigateText: "",    
    id: "",
    percentComplete: 0,
    loanAmount: 0,    
    userId: "",
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
    fullOwner: null,
  },
  reducers: {
    updateForm: (state, action) => {
      //console.log('updateForm: action', action)
      //console.log('updateForm: state',state)
      state.id = action.payload.id
      state.percentComplete = action.payload.percentComplete
      state.stage = action.payload.stage
      state.stageHeader = action.payload.stageHeader
      state.stageText = action.payload.stageText
      state.restricted = action.payload.restricted      
      state.forProfit = action.payload.forProfit
      state.fein = action.payload.fein
      state.tin = action.payload.tin
      state.ssn = action.payload.ssn
      state.idType = action.payload.idType
      state.businessName = action.payload.businessName
      state.dba = action.payload.dba
      state.businessAddress1 = action.payload.businessAddress1
      state.businessAddress2 = action.payload.businessAddress2
      state.businessCity = action.payload.businessCity
      state.businessState = action.payload.businessState
      state.businessZip = action.payload.businessZip
      state.businessZipPlus4 = action.payload.businessZipPlus4
      state.agreeLexisNexis = action.payload.agreeLexisNexis   
      state.fullOwner = action.payload.fullOwner
    },
  },
});

export const { updateFormStatus, updateForm } = formSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const updateFormAsync = form => dispatch => {
  console.log('updateFormAsync: form', form)
  API.graphql({ 
      query: updateFormMutation, 
      variables: { 
        input: {
          id: form.id, 
          percentComplete: form.percentComplete,
          stage: form.stage,
          stageHeader: form.stageHeader,
          stageText: form.stageText,
          stageNavigate: form.stageNavigate,
          restricted: form.restricted,
          forProfit: form.forProfit,
          fein: form.fein,
          tin: form.tin,
          ssn: form.ssn,
          idType: form.idType,
          businessName: form.businessName,
          dba: form.dba,
          businessAddress1: form.businessAddress1,
          businessAddress2: form.businessAddress2,
          businessCity: form.businessCity,
          businessState: form.businessState,
          businessZip: form.businessZip,
          businessZipPlus4: form.businessZipPlus4,
          agreeLexisNexis: form.agreeLexisNexis,
          fullOwner: form.fullOwner,
        }
      } 
  })    
  dispatch(updateForm(form));
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectForm = state => state.form;

export default formSlice.reducer;