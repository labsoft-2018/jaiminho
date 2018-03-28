import { IOrder, OrderStatus } from './model'
import { IComponents } from '..'
import * as db from './database'
import * as diplomat from './diplomat'
import { IOrderInput, IPaymentInfoInput } from './resolvers/mutation'
import { v4 } from 'uuid/v4'
import { PaymentRequestRejected } from './errors'
import { buildInitialOrderFromInput } from './logic'

const generateMagicWord = () => v4()

export const createOrder = async (orderInput: IOrderInput, paymentInfo: IPaymentInfoInput, components: IComponents): Promise<IOrder> => {
  const { http, models } = components
  const { order: orderDb } = models.getModels()
  const amount = await diplomat.getPricing(http, orderInput.sourceLocation, orderInput.destLocation)
  const magicWord = generateMagicWord()
  const order = buildInitialOrderFromInput(orderInput, amount, magicWord)
  const createdOrder = await db.createNewOrder(orderDb, order)
  const paymentRequestApproved = await diplomat.newPaymentRequest(http, paymentInfo, order)
  if (!paymentRequestApproved) {
    throw new PaymentRequestRejected()
  }
  return createdOrder
}
