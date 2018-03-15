import { IOrderInput } from './resolvers/mutation';
import { IOrder, OrderStatus } from './model';
import * as R from 'ramda'

export const buildInitialOrderFromInput = (orderInput: IOrderInput, amount: number, magicWord: string): IOrder => {
  console.log('amount: ', amount)
  return R.merge(orderInput, {
    amount,
    magicWord,
    status: OrderStatus.WAITING_PAYMENT_APPROVAL,
  })
}
