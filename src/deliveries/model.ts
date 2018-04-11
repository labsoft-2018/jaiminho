import * as Sequelize from 'sequelize'
import { IModelDescription } from '../models'

export const deliveryModel: IModelDescription = {
  tableName: 'deliveries',
  attributes: {
    status: {
      type: Sequelize.STRING,
    },
    carrierId: {
      type: Sequelize.STRING,
    },
  },
}
