import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_WINE = gql`
    mutation addWine($wineName: String!, $wineType: String!) {
        addWine(wineName: $wineName, wineType: $wineType, wineText: $wineText) {
            _id
            wineName
            wineType
            wineText
            wineImage
            createdAt
            category {
                name
        }
    }
`;
