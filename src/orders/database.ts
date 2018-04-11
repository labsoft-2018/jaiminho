import * as Sequelize from 'sequelize'
import { OrderDatabase, IOrder, IDatabaseOrder, OrderStatus } from './model'
import { databaseOrderToOrder, orderToDatabaseOrder } from './adapters'
import { map } from 'lodash'

export const createNewOrder = async (orderDb: OrderDatabase, order: IOrder): Promise<Partial<IOrder>> => {
  const createdOrder = await orderDb.create(orderToDatabaseOrder(order))
  return databaseOrderToOrder(createdOrder.toJSON())
}

export const getOrderById = async (orderDb: OrderDatabase, id: string): Promise<Partial<IOrder> | null> => {
  const order = await orderDb.findById(id)
  if (!order) {
    return null
  }
  return databaseOrderToOrder(order.toJSON())
}

export const getAllocatedOrders = async (orderDb: OrderDatabase, userId: string, carrierId: string): Promise<void[]> => {
  const order = await orderDb.findAll({
    where: {
      userId,
      carrierId,
      status: OrderStatus.ALLOCATED,
    },
  })
  return map(order, (x) => {databaseOrderToOrder(x.toJSON())})
}
