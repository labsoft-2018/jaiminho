import * as Sequelize from 'sequelize'

export interface IModelMap {
  tableName: string,
  attributes: Sequelize.DefineAttributes,
  relations?: (thisModel: Sequelize.Model<any, any>, otherModels: {[key: string]: Sequelize.Model<any, any>})
}
