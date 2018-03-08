import * as graphqlHTTP from 'express-graphql'
import * as express from 'express'
import { schema } from './graphql/schema';
import { GraphQLSchema } from 'graphql'
import { IComponents } from './components/index'

export const routes = express.Router()

export interface IContext {
  components: IComponents
}

routes.use('/graphql', graphqlHTTP((req: any) => ({
  schema,
  graphiql: true,
  context: {
    components: req.components,
  },
})))
