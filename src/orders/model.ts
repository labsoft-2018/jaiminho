import * as Sequelize from 'sequelize'
import { IModelDescription } from '../models'
import { ILocation } from '../common/model'

export interface IOrder {
  id: string
  userId?: string
  carrierId?: string
  sourceLocation: ILocation
  destLocation: ILocation
  deliveryInstructions?: string
  withdrawalInstructions?: string
  contactNumber?: string
  status?: OrderStatus
  magicWord?: string
  amount?: number
  deliveryId?: string
}

export interface IDatabaseOrder {
  id?: string
  userId?: string
  carrierId?: string
  sourceLat: number
  sourceLng: number
  sourceAddress: string
  destLat: number
  destLng: number
  destAddress: string
  deliveryInstructions?: string
  withdrawalInstructions?: string
  contactNumber?: string
  status?: OrderStatus
  magicWord?: string
  amount?: number
  deliveryId?: string
}

export enum OrderStatus {
  WAITING_PAYMENT_APPROVAL = 'WAITING_PAYMENT_APPROVAL',
  ALLOCATED = 'ALLOCATED',
  CLOSED = 'CLOSED',
  CANCELLED = 'CANCELLED',
  DELIVERED = 'DELIVERED',
}

export type OrderDatabase = Sequelize.Model<Sequelize.Instance<IDatabaseOrder>, IDatabaseOrder>

export const orderModel: IModelDescription = {
  tableName: 'orders',
  attributes: {
    // id: {
    //   primaryKey: true,
    //   type: Sequelize.UUID,
    //   defaultValue: Sequelize.UUIDV4,
    // },
    userId: {
      type: Sequelize.STRING,
    },
    sourceLocation: {
      type: new Sequelize.VIRTUAL(Sequelize.BOOLEAN, ['sourceLat', 'sourceLng', 'sourceAddress']),
      get() {
        return {
          lat: this.get('sourceLat'),
          lng: this.get('sourceLng'),
          address: this.get('sourceAddress'),
        }
      },
    },
    sourceLat: {
      type: Sequelize.FLOAT,
    },
    sourceLng: {
      type: Sequelize.FLOAT,
    },
    sourceAddress: {
      type: Sequelize.STRING,
    },
    destLocation: {
      type: new Sequelize.VIRTUAL(Sequelize.BOOLEAN, ['destLat', 'destLng', 'destAddress']),
      get() {
        return {
          lat: this.get('destLat'),
          lng: this.get('destLng'),
          address: this.get('destAddress'),
        }
      },
    },
    destLat: {
      type: Sequelize.FLOAT,
    },
    destLng: {
      type: Sequelize.FLOAT,
    },
    destAddress: {
      type: Sequelize.STRING,
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
    carrierId: {
      type: Sequelize.STRING,
    },
  },
}
