import * as graphqlHTTP from 'express-graphql'
import * as express from 'express'
import { schema } from './graphql/schema';
import { GraphQLSchema } from 'graphql'

export const routes = express.Router()

routes.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}))


