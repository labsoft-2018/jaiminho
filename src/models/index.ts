import * as Sequelize from 'sequelize'
import { IModelDescriptionMap } from '../components/models'
import { deliveryModel } from './delivery'
import { orderModel, IDatabaseOrder } from './order'

export interface IModelDescription {
  tableName: string,
  attributes: Sequelize.DefineAttributes,
  relations?: (thisModel: Sequelize.Model<any, any>, otherModels: IModels) => void
}

export interface IModels {
  delivery: Sequelize.Model<any, any>,
  order: Sequelize.Model<Sequelize.Instance<IDatabaseOrder>, IDatabaseOrder>
}
export const modelDescriptionMap: IModelDescriptionMap = {
  delivery: deliveryModel,
  order: orderModel,
}
