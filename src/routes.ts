import * as graphqlHTTP from 'express-graphql'
import * as express from 'express'
import { schema } from './graphql/schema';
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

routes.use('/graphql', graphqlHTTP((req: any) => ({
  schema,
  graphiql: true,
  context: {
    components: req.components,
    user: {
      id: 'user-1',
      scopes: ['customer']
    },
  },
})))
