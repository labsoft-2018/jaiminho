import * as Sequelize from 'sequelize'
import { IModelDescriptionMap } from '../components/models'
import { deliveryModel } from './delivery'
import { orderModel } from './order'

export interface IModelDescription {
  tableName: string,
  attributes: Sequelize.DefineAttributes,
  relations?: (thisModel: Sequelize.Model<any, any>, otherModels: {[key: string]: Sequelize.Model<any, any>}) => void
}

export interface IModels {
  delivery: Sequelize.Model<any, any>,
  order: Sequelize.Model<any, any>
}
export const modelDescriptionMap: IModelDescriptionMap = {
  delivery: deliveryModel,
  order: orderModel,
}
