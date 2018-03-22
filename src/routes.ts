import * as graphqlHTTP from 'express-graphql'
import * as express from 'express'
import * as jwt from 'jsonwebtoken'
import { buildSchema } from './graphql/schema'
import { GraphQLSchema } from 'graphql'
import { IComponents } from '.'
import { reqToContext } from './graphql/context'

export const routes = express.Router()

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
routes.use('/graphql', graphqlHTTP(async (req: IRequest) => ({
  schema,
  graphiql: true,
  context: await reqToContext(req),
})))
