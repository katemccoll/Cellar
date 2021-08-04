const { gql } = require('apollo-server-express');

const typeDefs = gql `
    type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    wines: [Wine]
  }
  type Wine {
    _id: ID
    wineName: String
    wineType: String
    wineText: String
    wineImage: String
    createdAt: String
  }
  
  type Category {
    _id: ID
    name: String
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(email: String!): User
    wine(wineId: ID!): Wine
    wines(category: ID, name: String): [Wine]
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    addWine(wineName: String!, wineType: String!, wineText: String!, wineImage: String): Wine
    updateWine(_id: ID!, wineName: String!, wineType: String!, wineText: String!): Wine 
    removeWine(wineId: ID!): Wine
  }
`

module.exports = typeDefs;