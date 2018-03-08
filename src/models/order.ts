import * as Sequelize from 'sequelize'
import { IModelMap } from '.';

export enum OrderType {
  TAKE_FROM_CLIENT,
  TAKE_TO_CLIENT,
}

export enum OrderStatus {
  ORDERED,
  ALLOCATED,
  CANCELLED,
  DELIVERED,
}

export const orderModel: IModelMap = {
  tableName: 'orders',
  attributes: {
    name: {
      type: Sequelize.STRING,
    },
    sourceLat: {
      type: Sequelize.FLOAT,
    },
    sourceLng: {
      type: Sequelize.FLOAT,
    },
    destLat: {
      type: Sequelize.FLOAT,
    },
    destLng: {
      type: Sequelize.FLOAT,
    },
    type: {
      type: Sequelize.ENUM(Object.keys(OrderType)),
    },
    deliveryInstructions: {
      type: Sequelize.STRING,
    },
    withdrawalInstructions: {
      type: Sequelize.STRING,
    },
    contactNumber: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.ENUM(Object.keys(OrderStatus)),
    },
    magicWord: {
      type: Sequelize.STRING,
    },
    carrierId: {
      type: Sequelize.STRING,
    },
    customerId: {
      type: Sequelize.STRING,
    }
  },
};
