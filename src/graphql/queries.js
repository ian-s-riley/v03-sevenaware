/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getForm = /* GraphQL */ `
  query GetForm($id: ID!) {
    getForm(id: $id) {
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
export const listForms = /* GraphQL */ `
  query ListForms(
    $filter: ModelFormFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listForms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getNotification = /* GraphQL */ `
  query GetNotification($id: ID!) {
    getNotification(id: $id) {
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
export const listNotifications = /* GraphQL */ `
  query ListNotifications(
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
