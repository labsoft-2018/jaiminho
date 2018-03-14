import gql from 'graphql-tag'
import commonTypeDefs from '../common/type-defs'

const pricingTypeDefs = gql`
  # ENUM
  enum OrderStatus {
    ORDERED
    ALLOCATED
    CANCELLED
    DELIVERED
  }

  # INPUT
  input CreateOrderInput {
    sourceLocation: InputLocation!
    destLocation: InputLocation!
    deliveryInstructions: String
    withdrawalInstructions: String
    contactNumber: String!
  }

  # TYPE
  type Customer {
    id: ID!
    name: String!
  }

  type Carrier {
    id: ID!
    name: String!
    imageUrl: String!
  }

  type Order {
    id: ID!
    customer: Customer!
    carrier: Carrier
    sourceLocation: Location!
    destLocation: Location!
    deliveryInstructions: String
    withdrawalInstructions: String
    contactNumber: String!
    status: OrderStatus!
    magicWord: String!
  }

  # EXTENSIONS
  extend type Query {
    order(id: ID!): Order
  }

  extend type Mutation {
    createOrder(input: CreateOrderInput!): Order
  }
`

export default () => [commonTypeDefs, pricingTypeDefs]
