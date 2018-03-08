import * as Sequelize from 'sequelize'
import { IModelDescription } from '.';

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
  relations: (self: Sequelize.Model<any, any>, { order }) => {
    self.hasMany(order)
  },
};
