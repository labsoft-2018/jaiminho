import * as Sequelize from 'sequelize'
import { IModelDescription } from '../models';
import { ILocation } from '../common/model';

export interface IOrder {
  id?: string
  userId: string
  sourceLocation: ILocation
  destLocation: ILocation
  deliveryInstructions: string
  withdrawalInstructions: string
  contactNumber: string
  status: OrderStatus
  magicWord: string
  amount?: number;
}

export interface IDatabaseOrder {
  id?: string;
  userId: string;
  sourceLat: number;
  sourceLng: number;
  destLat: number;
  destLng: number;
  deliveryInstructions: string;
  withdrawalInstructions: string;
  contactNumber: string;
  status: OrderStatus;
  magicWord: string;
  amount?: number;
}

export enum OrderStatus {
  WAITING_PAYMENT_APPROVAL = 'WAITING_PAYMENT_APPROVAL',
  ALLOCATED = 'ALLOCATED',
  CANCELLED = 'CANCELLED',
  DELIVERED = 'DELIVERED',
}

export type OrderDatabase = Sequelize.Model<Sequelize.Instance<IDatabaseOrder>, IDatabaseOrder>

export const orderModel: IModelDescription = {
  tableName: 'orders',
  attributes: {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    userId: {
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
    amount: {
      type: Sequelize.DECIMAL(10, 2), //  not sure
    },
  },
};
