import { IContext } from '../routes'
import { combineResolvers, skip } from 'graphql-resolvers'
import * as _ from 'lodash'
import { TransparentError } from '../graphql/errors'

const hasScopes = (requiredScopes: string[], userScopes: string[]): boolean => {
  if (!userScopes) {
    return false
  }
  return _.intersection(requiredScopes, userScopes).length > 0
}

const isAuthenticated = (user) => !!user

export const authenticated = (value, args, { user }: IContext) => isAuthenticated(user) ? skip : new TransparentError('NotAuthenticated')
export const scopes = (requiredScopes: string[]) => combineResolvers(authenticated, (value, args, { user }: IContext) => hasScopes(requiredScopes, user.scopes) ? skip : new TransparentError('NotAuthorized'))
