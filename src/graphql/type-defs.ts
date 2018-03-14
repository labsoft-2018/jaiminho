import gql from 'graphql-tag'

export const typeDefs = gql`
type Carrier {
  id: ID!
  name: String!
  imageUrl: String!
}

type Query {
  hello: String!
  getAuctionedDeliveries: String!
  order(id: ID!): Order
}

type Mutation {
  confirmDeliveredOrder(magicWord: String!): Boolean
  createOrder(input: CreateOrderInput!): Order
  order(id: ID!): Order
}
`
