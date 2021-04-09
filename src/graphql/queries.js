/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getForm = /* GraphQL */ `
  query GetForm($id: ID!) {
    getForm(id: $id) {
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
export const listForms = /* GraphQL */ `
  query ListForms(
    $filter: ModelFormFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listForms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
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
      nextToken
    }
  }
`;
