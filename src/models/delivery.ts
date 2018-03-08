import * as Sequelize from 'sequelize'
import { IModelMap } from '.';

export const deliveryModel: IModelMap = {
  tableName: 'deliveries',
  attributes: {
    status: {
      type: Sequelize.STRING,
    },
    carrierId: {
      type: Sequelize.STRING,
    },
  },
  relations: (thisModel: Sequelize.Model<any, any>, { orderModel }) => {
    thisModel.hasMany(orderModel)
  },
};
