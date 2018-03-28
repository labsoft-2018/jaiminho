import { IOrderInput } from './resolvers/mutation';
import { IOrder, OrderStatus } from './model';
import * as R from 'ramda'

export const buildInitialOrderFromInput = (orderInput: IOrderInput, amount: number, userId: string, magicWord: string): IOrder => {
  return R.merge(orderInput, {
    amount,
    userId,
    magicWord,
    status: OrderStatus.WAITING_PAYMENT_APPROVAL,
  })
}
