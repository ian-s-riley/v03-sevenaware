/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
      fullOwner
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
        fullOwner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAddress = /* GraphQL */ `
  query GetAddress($id: ID!) {
    getAddress(id: $id) {
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
export const listAddresss = /* GraphQL */ `
  query ListAddresss(
    $filter: ModelAddressFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAddresss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
