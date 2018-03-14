import * as Sequelize from 'sequelize'
import { IModelDescription } from '../models';

export interface ILocation {
  lat: number;
  lng: number;
}
export interface IOrder {
  id?: string
  sourceLocation: ILocation
  destLocation: ILocation
  deliveryInstructions: string
  withdrawalInstructions: string
  status: OrderStatus
  magicWord: string
  carrierId: string
  customerId: string
}

export interface IDatabaseOrder {
  id?: string;
  sourceLat: number;
  sourceLng: number;
  destLat: number;
  destLng: number;
  deliveryInstructions: string;
  withdrawalInstructions: string;
  contactNumber: string;
  status: OrderStatus;
  magicWord: string;
  carrierId?: string;
  customerId: string;
}

export enum OrderStatus {
  ORDERED = 'ORDERED',
  ALLOCATED = 'ALLOCATED',
  CANCELLED = 'CANCELLED',
  DELIVERED = 'DELIVERED',
}

export const orderModel: IModelDescription = {
  tableName: 'orders',
  attributes: {
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
    },
  },
};