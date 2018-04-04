import { system } from '../src/system'
import { IComponents } from '../src/index'
import { createOrder } from '../src/orders/controller'
import { roundedPricingFromDistance, roundedPrice } from '../src/pricing/logic'
import { IDistanceResponse } from '../src/components/distance-api'
import * as Big from 'big.js'

describe('orders', () => {
  it('rounds the price', async () => {
    expect(roundedPrice(new Big('10.01'))).toEqual(10.01)
    expect(roundedPrice(new Big('10.0101'))).toEqual(10.01)
    expect(roundedPrice(new Big('10.995'))).toEqual(11)
  })

  it('rounds the response', async () => {
    const response = {
      duration: 60,
      distance: 1000,
    }
    expect(roundedPricingFromDistance(response)).toEqual(1.65)
  })
})
