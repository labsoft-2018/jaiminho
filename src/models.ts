import * as Sequelize from 'sequelize'
import { IDatabaseOrder, orderModel, OrderDatabase } from './orders/model'
import { deliveryModel } from './deliveries/model';
import { IModelDescriptionMap } from './components/models';

export interface IModelDescription {
  tableName: string,
  attributes: Sequelize.DefineAttributes,
  relations?: (thisModel: Sequelize.Model<any, any>, otherModels: IModels) => void
}

export interface IModels {
  delivery: Sequelize.Model<any, any>,
  order: OrderDatabase
}
export const modelDescriptionMap: IModelDescriptionMap = {
  delivery: deliveryModel,
  order: orderModel,
}
