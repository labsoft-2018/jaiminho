import { ILocation } from '../common/model'
import { IDistanceResponse } from '../components/distance-api'
import { roundUp } from '../common/math'
import * as R from 'ramda'

export const pricingFromDistance = (distance: IDistanceResponse) => ((distance.duration / 60) * 0.25) + ((distance.distance / 1000) * 1.4)
export const roundedPricingFromDistance = (distance: IDistanceResponse) => R.pipe(pricingFromDistance, roundUp(2))(distance)
