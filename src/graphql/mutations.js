/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createForm = /* GraphQL */ `
  mutation CreateForm(
    $input: CreateFormInput!
    $condition: ModelFormConditionInput
  ) {
    createForm(input: $input, condition: $condition) {
      id
      formId
      userId
      description
      percentComplete
      restricted
      forProfit
      fein
      tin
      ssn
      idType
      businessName
      dba
      businessAddress1
      businessAddress2
      businessCity
      businessState
      businessZip
      businessZipPlus4
      agreeLexisNexis
      createdAt
      updatedAt
    }
  }
`;
export const updateForm = /* GraphQL */ `
  mutation UpdateForm(
    $input: UpdateFormInput!
    $condition: ModelFormConditionInput
  ) {
    updateForm(input: $input, condition: $condition) {
      id
      formId
      userId
      description
      percentComplete
      restricted
      forProfit
      fein
      tin
      ssn
      idType
      businessName
      dba
      businessAddress1
      businessAddress2
      businessCity
      businessState
      businessZip
      businessZipPlus4
      agreeLexisNexis
      createdAt
      updatedAt
    }
  }
`;
export const deleteForm = /* GraphQL */ `
  mutation DeleteForm(
    $input: DeleteFormInput!
    $condition: ModelFormConditionInput
  ) {
    deleteForm(input: $input, condition: $condition) {
      id
      formId
      userId
      description
      percentComplete
      restricted
      forProfit
      fein
      tin
      ssn
      idType
      businessName
      dba
      businessAddress1
      businessAddress2
      businessCity
      businessState
      businessZip
      businessZipPlus4
      agreeLexisNexis
      createdAt
      updatedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      userId
      userType
      email
      password
      firstName
      middleName
      lastName
      address1
      address2
      city
      state
      zip
      zipPlus4
      title
      profile
      image
      sevenAwareAgree
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      userId
      userType
      email
      password
      firstName
      middleName
      lastName
      address1
      address2
      city
      state
      zip
      zipPlus4
      title
      profile
      image
      sevenAwareAgree
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      userId
      userType
      email
      password
      firstName
      middleName
      lastName
      address1
      address2
      city
      state
      zip
      zipPlus4
      title
      profile
      image
      sevenAwareAgree
      createdAt
      updatedAt
    }
  }
`;
