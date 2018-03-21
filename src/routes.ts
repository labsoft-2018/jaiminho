import * as graphqlHTTP from 'express-graphql'
import * as express from 'express'
import * as jwt from 'jsonwebtoken'
import { buildSchema } from './graphql/schema';
import { GraphQLSchema } from 'graphql'
import { IComponents } from '.';

export const routes = express.Router()

export interface IUser {
  id: string
  scopes: string[]
}

export interface IContext {
  components: IComponents
  user: IUser
}

const userFromReq = (req) => {
  if (req.headers && req.headers.authorization) {
    const decoded = jwt.verify(req.headers.authorization, 'blah')
    return {
      id: decoded.id,
      scopes: decoded.scopes || [],
    }
  }
  return null
}

const schema = buildSchema()
routes.use('/graphql', graphqlHTTP((req: any) => ({
  schema,
  graphiql: true,
  context: {
    components: req.components,
    user: userFromReq(req),
  },
})))
