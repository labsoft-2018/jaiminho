import { makeExecutableSchema } from 'graphql-tools'
import * as orders from '../orders'
import * as deliveries from '../deliveries';
import * as common from '../common'
import gql from 'graphql-tag';
import { merge } from 'lodash';

const RootTypes = gql`
type Query {
  version: String
}
type Mutation {
  ping: Int
}
`

export const buildSchema = () => {
  const resolvers = merge(orders.resolvers, deliveries.resolvers)
  return makeExecutableSchema({
    typeDefs: [orders.typeDefs, deliveries.typeDefs, RootTypes],
    resolvers,
  })
}
