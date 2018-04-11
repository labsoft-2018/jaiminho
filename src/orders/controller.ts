import { IOrder, OrderStatus } from './model'
import { IComponents } from '..'
import * as db from './database'
import * as diplomat from './diplomat'
import { IOrderInput, IPaymentInfoInput } from './resolvers/mutation'
import { v4 } from 'uuid/v4'
import { PaymentRequestRejected } from './errors'
import { buildInitialOrderFromInput } from './logic'
import * as pricingDiplomat from '../pricing/diplomat'
import { roundedPricingFromDistance } from '../pricing/logic'
import { ISQSProducer } from '../components/producer'

const generateMagicWord = () => v4()

export interface IDeliveryRequestedMessage {
  order: {
    id: string,
    'source-location': {
      lat: number,
      lng: number,
    },
    'destination-location': {
      lat: number,
      lng: number,
    },
  }
}

const deliveryRequestInternalToExternal = (order: IOrder): IDeliveryRequestedMessage => {
  return {
    order: {
      'id': order.id,
      'source-location': order.sourceLocation,
      'destination-location': order.destLocation,
    },
  }
}

const produceDeliveryRequested = (producer: ISQSProducer, data: IDeliveryRequestedMessage) => {
  producer.produceStandard({
    queueName: 'delivery-requested',
    data,
  })
}
export const createOrder = async (orderInput: IOrderInput, paymentInfo: IPaymentInfoInput, userId: string, components: IComponents): Promise<IOrder> => {
  const { http, models } = components
  const { order: orderDb } = models.getModels()
  const amount = roundedPricingFromDistance(await pricingDiplomat.getDistance(components.distanceService, orderInput.sourceLocation, orderInput.destLocation))
  const magicWord = generateMagicWord()
  const order = buildInitialOrderFromInput(orderInput, amount, userId, magicWord)
  const createdOrder = await db.createNewOrder(orderDb, order)
  const paymentRequestApproved = await diplomat.newPaymentRequest(http, paymentInfo, order)
  if (!paymentRequestApproved) {
    throw new PaymentRequestRejected()
  }

  const deliveryRequestedMessage = deliveryRequestInternalToExternal(createdOrder)
  await produceDeliveryRequested(components.sqsProducer, deliveryRequestedMessage)

  setTimeout(() => {
    components.sqsProducer.produceStandard({
      queueName: 'delivery-closed',
      data: {
        delivery: {
          'id': '1',
          'carrier-id': '1',
          'orders': [createdOrder.id],
          'status': 'CLOSED',
        },
      },
    })
  }, 2000)
  return createdOrder
}
