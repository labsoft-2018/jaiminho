import { IDatabaseOrder, IOrder } from './model';

export const databaseOrderToOrder = (databaseOrder: IDatabaseOrder): IOrder => {
  return {
    id: databaseOrder.id,
    sourceLocation: {
      lat: databaseOrder.sourceLat,
      lng: databaseOrder.destLat,
    },
    destLocation: {
      lat: databaseOrder.destLat,
      lng: databaseOrder.destLng,
    },
    deliveryInstructions: databaseOrder.deliveryInstructions,
    withdrawalInstructions: databaseOrder.withdrawalInstructions,
    contactNumber: databaseOrder.contactNumber,
    status: databaseOrder.status,
    magicWord: databaseOrder.magicWord,
    amount: databaseOrder.amount,
  }
}

export const orderToDatabaseOrder = (order: IOrder): IDatabaseOrder => {
  return {
    destLat: order.destLocation.lat,
    destLng: order.destLocation.lng,
    sourceLat: order.sourceLocation.lat,
    sourceLng: order.sourceLocation.lng,
    deliveryInstructions: order.deliveryInstructions,
    withdrawalInstructions: order.withdrawalInstructions,
    contactNumber: order.contactNumber,
    magicWord: order.magicWord,
    status: order.status,
    amount: order.amount,
  }
}
