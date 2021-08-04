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
    mutation addWine($wineryName: String!, $wineType: String!, $description: String!, $image: String, $rating: Float) {
        addWine(wineryName: $wineryName, wineType: $wineType, description: $description, image: $image, rating: $rating) {
            _id
            wineryName
            wineType
            description
            image
            rating
            createdAt
        }
    }
`;
