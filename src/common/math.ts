import * as R from 'ramda'
export const roundUp = R.curry((precision: number, num: number) => {
  const exp = Math.pow(10, precision)
  return Math.ceil(num * exp) / exp
})
