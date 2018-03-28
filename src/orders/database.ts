import * as Sequelize from 'sequelize'
import { OrderDatabase, IOrder, IDatabaseOrder, OrderStatus } from './model'
import { databaseOrderToOrder, orderToDatabaseOrder } from './adapters';
import { map } from 'lodash'

export const createNewOrder = async (orderDb: OrderDatabase, order: IOrder): Promise<IOrder> => {
  const createdOrder = await orderDb.create(orderToDatabaseOrder(order))
  return databaseOrderToOrder(createdOrder.toJSON())
}

export const getOrderById = async (orderDb: OrderDatabase, id: string): Promise<IOrder | null> => {
  const order = await orderDb.findById(id)
  if (!order) {
    return null
  }
  return databaseOrderToOrder(order.toJSON())
}

export const getAllocatedOrdersByUserId = async (orderDb: OrderDatabase, userId: string): Promise<void[]> => {
  const order = await orderDb.findAll({
    where: {
      userId: userId,
      status: OrderStatus.ALLOCATED
    }
  })
  return map(order, (x) => {databaseOrderToOrder(x.toJSON())})
}
