import { IContext } from '../../routes';
import { combineResolvers, skip } from 'graphql-resolvers'
import { scopes } from '../../interceptors/auth';
import { getDistance } from '../diplomat';
import { roundedPricingFromDistance } from '../logic'

export const Query = {
  getPricing: combineResolvers(
    scopes(['admin']),
    async (value, { sourceLocation, destLocation }, { components, user }: IContext)  => {
      const distance = await getDistance(components.distanceService, sourceLocation, destLocation)
      return roundedPricingFromDistance(distance)
    },
  ),
}
