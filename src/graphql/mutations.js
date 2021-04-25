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
      formId
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
      fein
      tin
      ssn
      idType
      percentOwner
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
      formId
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
      fein
      tin
      ssn
      idType
      percentOwner
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
      formId
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
      fein
      tin
      ssn
      idType
      percentOwner
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
      fullOwner
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
      fullOwner
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
      fullOwner
      createdAt
      updatedAt
    }
  }
`;
export const createAddress = /* GraphQL */ `
  mutation CreateAddress(
    $input: CreateAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    createAddress(input: $input, condition: $condition) {
      id
      userId
      addressType
      address1
      address2
      city
      state
      zip
      zipPlus4
      createdAt
      updatedAt
    }
  }
`;
export const updateAddress = /* GraphQL */ `
  mutation UpdateAddress(
    $input: UpdateAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    updateAddress(input: $input, condition: $condition) {
      id
      userId
      addressType
      address1
      address2
      city
      state
      zip
      zipPlus4
      createdAt
      updatedAt
    }
  }
`;
export const deleteAddress = /* GraphQL */ `
  mutation DeleteAddress(
    $input: DeleteAddressInput!
    $condition: ModelAddressConditionInput
  ) {
    deleteAddress(input: $input, condition: $condition) {
      id
      userId
      addressType
      address1
      address2
      city
      state
      zip
      zipPlus4
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
      fromEmail
      toEmail
      action
      status
      color
      badgeIcon
      title
      body
      emailBody
      smsBody
      footerTitle
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
      fromEmail
      toEmail
      action
      status
      color
      badgeIcon
      title
      body
      emailBody
      smsBody
      footerTitle
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
      fromEmail
      toEmail
      action
      status
      color
      badgeIcon
      title
      body
      emailBody
      smsBody
      footerTitle
      createdAt
      updatedAt
    }
  }
`;
