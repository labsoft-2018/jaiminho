import { IContext } from '../../routes';
import * as distance from 'google-distance';
import * as util from 'util';

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

export const Query = {
  getPricing: async (value, { sourceLocation, destLocation }, { components }: IContext)  => {
    return getDistance(
      {
        origin: formatLocation(sourceLocation),
        destination: formatLocation(destLocation),
      })
      .then(pricingFromDistance)
  },
}
