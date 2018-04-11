import { ILocation } from '../../common/model'
import { IComponents } from '../..'
import { OrderStatus } from '../../orders/model'
import { AnalysisOptions } from 'aws-sdk/clients/cloudsearch'
import * as Sequelize from 'sequelize'

export interface IDelivery {
  id: string
  carrierId: string,
  orders: string[],
  status: string,
  origin: ILocation,
  destination: ILocation,
  createdAt: string,
 }

export const deliveryAllocated = async (delivery: IDelivery, components: IComponents) => {
  const updateOrders = await components.models.getModels().order.update({
    status: OrderStatus.ALLOCATED,
    deliveryId: delivery.id,
  } as any, {
    where: {
      id: {
        [Sequelize.Op.in]: delivery.orders,
      },
    },
  })
}

export const deliveryClosed = async (delivery: IDelivery, components: IComponents) => {
  return components.models.getModels().order.update({
    status: OrderStatus.CLOSED,
    carrierId: delivery.carrierId,
    deliveryId: delivery.id,
  } as any, {
    where: {
      id: {
        [Sequelize.Op.in]: delivery.orders,
      },
    },
  })
}
