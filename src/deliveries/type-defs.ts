import gql from 'graphql-tag'
// import commonTypeDefs from '../common/type-defs'
import orderTypeDefs from '../orders/type-defs'

const pricingTypeDefs = gql`
  # ENUM
  enum DeliveryStatus {
    OPEN    # aceitando orders
    CLOSED  # nao aceita mais orders
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
