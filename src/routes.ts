import * as graphqlHTTP from 'express-graphql'
import * as express from 'express'
import * as jwt from 'jsonwebtoken'
import { buildSchema } from './graphql/schema'
import { GraphQLSchema } from 'graphql'
import { IComponents } from '.'
import { reqToContext } from './graphql/context'
import { makeFormatError } from './graphql/errors'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import * as bodyParser from 'body-parser'

export const routes = express.Router()

const formatError = makeFormatError()

export interface IUser {
  id: string
  scopes: string[]
}

export interface IContext {
  components: IComponents
  user: IUser
}

export interface IRequest extends express.Request {
  components: IComponents
}

const schema = buildSchema()
// routes.use('/graphql', graphqlHTTP(async (req: IRequest) => ({
//   schema,
//   formatError: (errors) => {
//     console.log(errors)
//     return errors
//   },
//   graphiql: true,
//   context: await reqToContext(req),
// })))

routes.use('/graphql', bodyParser.json(), graphqlExpress(async (req: IRequest) => ({
  schema,
  formatError: (errors) => {
    return formatError(errors)
  },
  debug: true,
  context: await reqToContext(req),
})))
routes.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
