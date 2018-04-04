import { IDatabaseOrder, IOrder } from './model'
import { IDelivery } from './controller/delivery'
import { ILocation } from '../common/model'

export interface IDeliveryClosedMessage {
  delivery: {
    id: string
    'carrier-id': string,
    'orders': string[],
    status: string,
    origin: ILocation,
    destination: ILocation,
    'created-at': string,
  }
}

export const deliveryObjectToDelivery = (data: IDeliveryClosedMessage): IDelivery => {
  const delivery = data.delivery
  return {
    id: delivery.id,
    carrierId: delivery['carrier-id'],
    orders: delivery.orders,
    status: delivery.status,
    origin: delivery.origin,
    destination: delivery.destination,
    createdAt: delivery['created-at'],
  }
}
