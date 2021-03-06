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
    wineryName: String
    wineType: String
    description: String
    image: String
    createdAt: String
    rating: Float,
    region: String,
    year: Int
  }
    
  type Auth {
    token: ID!
    user: User
  }
  
  input WineFilters {
    rating: Float,
    wineType: String,
    sortBy: String,
    searchWineryName: String,
  } 
  
  type Query {
    user: User
    wine(wineId: ID!): Wine
    wines(filters: WineFilters): [Wine]
  }
  
  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String!, lastName: String!, email: String!, password: String!): User
    login(email: String!, password: String!): Auth
    addWine(wineryName: String!, wineType: String!, description: String, image: String, rating: Float, 
            region: String, year: Int): Wine
    updateWine(_id: ID!, wineryName: String!, wineType: String!, description: String!): Wine 
    removeWine(wineId: ID!): Wine
  }
  
`

module.exports = typeDefs;