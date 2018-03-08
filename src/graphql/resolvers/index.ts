import { query } from "./query";
import { mutation } from './mutation/index'

export const resolvers = {
  Query: query,
  Mutation: mutation
}