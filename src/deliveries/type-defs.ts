import gql from 'graphql-tag'
// import commonTypeDefs from '../common/type-defs'
import orderTypeDefs from '../orders/type-defs'

const pricingTypeDefs = gql`
  # ENUM
  enum DeliveryStatus {
    AUCTIONED
    ACCEPTED
    FINISHED
    CANCELLED
  }
  # INPUT

  # TYPE
  type Delivery {
    carrier: Carrier!
    status: DeliveryStatus
    orders: [Order!]!
  }
`

export default () => [orderTypeDefs, pricingTypeDefs]
