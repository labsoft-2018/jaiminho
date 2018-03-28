import gql from 'graphql-tag'
import commonTypeDefs from '../common/type-defs'

const pricingTypeDefs = gql`
  # ENUM
  enum OrderStatus {
    WAITING_PAYMENT_APPROVAL
    ALLOCATED
    CANCELLED
    DELIVERED
  }

  # INPUT
  input PaymentInfoInput {
    cardId: String!
  }

  input OrderInput {
    sourceLocation: InputLocation!
    destLocation: InputLocation!
    deliveryInstructions: String
    withdrawalInstructions: String
    contactNumber: String!
  }
  input CreateOrderInput {
    order: OrderInput!
    paymentInfo: PaymentInfoInput!
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
    amount: Float
  }

  # EXTENSIONS
  extend type Query {
    order(id: ID!): Order
    isTrackingAuthorized(userId: String, carrierId: String): Boolean
  }

  extend type Mutation {
    createOrder(input: CreateOrderInput!): Order
  }
`

export default () => [commonTypeDefs, pricingTypeDefs]
