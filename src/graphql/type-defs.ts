export const typeDefs = `
enum OrderType {
  TAKE_TO_CLIENT
  TAKE_FROM_CLIENT
}

enum OrderStatus {
  ORDERED
  ALLOCATED
  CANCELLED
  DELIVERED
}

enum DeliveryStatus {
  AUCTIONED
  ACCEPTED
  FINISHED
  CANCELLED
}

type Customer {
  id: ID!
  name: String!
}

type Location {
  lat: Float!
  lng: Float!
}


type Carrier {
  id: ID!
  name: String!
  imageUrl: String!
}

type Order {
  id: ID!
  customer: Customer!
  sourceLocation: Location!
  destLocation: Location!
  type: OrderType!
  deliveryInstructions: String
  withdrawalInstructions: String
  contactNumber: String!
  status: OrderStatus!
  magicWord: String!
  carrier: Carrier
}
type Delivery {
  carrier: Carrier!
  status: DeliveryStatus
  orders: [Order!]!
}

type CreateOrderPayload {
  order: Order!
}

type Query {
  hello: String!
  getAuctionedDeliveries: String!
}

input CreateOrderInput {
  sourceLocation: Location!
  destLocation: Location!
  type: OrderType!
  deliveryInstructions: String
  withdrawalInstructions: String
  contactNumber: String!
}

type Mutation {
  confirmDeliveredOrder(magicWord: String!): Boolean
  createOrder(input: CreateOrderInput!): CreateOrderPayload
  order(id: ID!): Order
}
`