const { gql } = require('apollo-server-express');

const typeDefs = gql `
    type User {
    _id: ID
    username: String
    email: String
    password: String
    wines: [Wine]!
  }
  type Wine {
    _id: ID
    wineName: String
    wineType: String
    createdAt: String
    comments: [Comment]!
  }
  
  type Comment {
    _id: ID
    commentText: String
    createdAt: String
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    wines(username: String): [Wine]
    wine(wineId: ID!): Wine
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addWine(wineName: String!): Wine
    addComment(wineId: ID!, commentText: String!): Wine
    removeWine(wineId: ID!): Wine
    removeComment(wineId: ID!, commentId: ID!): Wine
  }
`

module.exports = typeDefs;