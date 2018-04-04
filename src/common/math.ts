import * as R from 'ramda'
import * as Big from 'big.js'

export const roundUp = (num: Big) => parseFloat(num.round(2, 1))
