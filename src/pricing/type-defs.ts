import gql from 'graphql-tag'
import commonTypeDefs from '../common/type-defs'

const pricingTypeDefs = gql`
  extend type Query {
    getPricing(sourceLocation: Location!, destLocation: Location!)
  }
`

export default () => [commonTypeDefs, pricingTypeDefs]
