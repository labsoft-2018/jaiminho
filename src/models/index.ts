import * as Sequelize from 'sequelize'

export interface IModelMap {
  tableName: string,
  attributes: Sequelize.DefineAttributes
}
