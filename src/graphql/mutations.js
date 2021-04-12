/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      userAddress1
      userAddress2
      userCity
      userState
      userZip
      userZipPlus4
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
      userAddress1
      userAddress2
      userCity
      userState
      userZip
      userZipPlus4
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
      userAddress1
      userAddress2
      userCity
      userState
      userZip
      userZipPlus4
      title
      profile
      image
      sevenAwareAgree
      createdAt
      updatedAt
    }
  }
`;
export const createForm = /* GraphQL */ `
  mutation CreateForm(
    $input: CreateFormInput!
    $condition: ModelFormConditionInput
  ) {
    createForm(input: $input, condition: $condition) {
      id
      userId
      formId
      percentComplete
      loanAmount
      stage
      stageHeader
      stageText
      stageNavigate
      stageNavigateText
      restricted
      forProfit
      fein
      tin
      ssn
      idType
      businessName
      businessImage
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
      userId
      formId
      percentComplete
      loanAmount
      stage
      stageHeader
      stageText
      stageNavigate
      stageNavigateText
      restricted
      forProfit
      fein
      tin
      ssn
      idType
      businessName
      businessImage
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
      userId
      formId
      percentComplete
      loanAmount
      stage
      stageHeader
      stageText
      stageNavigate
      stageNavigateText
      restricted
      forProfit
      fein
      tin
      ssn
      idType
      businessName
      businessImage
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
export const createNotification = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    createNotification(input: $input, condition: $condition) {
      id
      fromUserId
      toUserId
      title
      message
      action
      status
      createdAt
      updatedAt
    }
  }
`;
export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification(
    $input: UpdateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    updateNotification(input: $input, condition: $condition) {
      id
      fromUserId
      toUserId
      title
      message
      action
      status
      createdAt
      updatedAt
    }
  }
`;
export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification(
    $input: DeleteNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    deleteNotification(input: $input, condition: $condition) {
      id
      fromUserId
      toUserId
      title
      message
      action
      status
      createdAt
      updatedAt
    }
  }
`;
