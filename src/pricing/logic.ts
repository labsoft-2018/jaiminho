import { ILocation } from '../common/model'
import { IDistanceResponse } from '../components/distance-api'
import { roundUp } from '../common/math'
import * as R from 'ramda'
import * as Big from 'big.js'

export const pricingFromDistance = (distance: IDistanceResponse) => new Big(((distance.duration / 60) * 0.25) + ((distance.distance / 1000) * 1.4))
export const roundedPrice = (price: Big) => roundUp(price)
export const roundedPricingFromDistance = (distance: IDistanceResponse) => roundedPrice(pricingFromDistance(distance))
