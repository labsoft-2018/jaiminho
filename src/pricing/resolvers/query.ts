import { IContext } from '../../routes';
import * as distance from 'google-distance';
import * as util from 'util';
import * as _ from 'lodash'
import { combineResolvers, skip } from 'graphql-resolvers'
import { isAbsolute } from 'path';

_.intersection()

// {
//   getPricing(
//     sourceLocation:{lat:1, lng:2}
//     destLocation:{lat:1, lng:2}
//   )
// }

distance.apiKey = process.env.GOOGLE_API_KEY
const formatLocation = (location) => util.format('%f,%f', location.lat, location.lng)
const pricingFromDistance = (distance) => distance.durationValue / 60 * 0.25 + distance.distanceValue / 1000 * 1.4

const getDistance = (params) => new Promise((resolve, reject) => {
  distance.get(
    params,
    function(err, data) {
      if (err)
        reject(err)
      else
        resolve(data)
  });
})

const hasScopes = (requiredScopes: string[], userScopes: string[]): boolean => {
  if (!userScopes)
    return false;
  return _.intersection(requiredScopes, userScopes).length > 0
}

const isAuthenticated = (user) => !!user

const authenticated = (_, __, { user }: IContext) => isAuthenticated(user) ? skip : new Error("Not authenticated")
const scopes = (requiredScopes: string[]) => combineResolvers(authenticated, (_, __, { user }: IContext) => hasScopes(requiredScopes, user.scopes) ? skip : new Error("Not authorized"))

export const Query = {
  getPricing: combineResolvers(
    scopes(["x"]),
    async (value, { sourceLocation, destLocation }, { components, user }: IContext)  => {
      if (!hasScopes(["admin"], user.scopes))
        throw new Error("Not authorized")
      return getDistance(
        {
          origin: formatLocation(sourceLocation),
          destination: formatLocation(destLocation),
        })
        .then(pricingFromDistance)
    },
  )
}
