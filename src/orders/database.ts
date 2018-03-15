import * as Sequelize from 'sequelize'
import { OrderDatabase, IOrder, IDatabaseOrder } from './model'
import { databaseOrderToOrder, orderToDatabaseOrder } from './adapters';

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
