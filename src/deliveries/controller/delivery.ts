import { ILocation } from '../../common/model'
import { IComponents } from '../..'
import { OrderStatus } from '../../orders/model'

export interface IDelivery {
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

export const deliveryAllocated = async (delivery: IDelivery, components: IComponents) => {
  const updateOrders = await components.models.getModels().order.update({
    status: OrderStatus.ALLOCATED,
    deliveryId: delivery.delivery.id,
  }, {
    where: {
      id: {
        $in: delivery.delivery.orders,
      },
    },
  })
}

export const deliveryClosed = async (delivery: IDelivery, components: IComponents) => {
  const updateOrders = await components.models.getModels().order.update({
    status: OrderStatus.CLOSED,
  }, {
    where: {
      id: {
        $in: delivery.delivery.orders,
      },
    },
  })
}
