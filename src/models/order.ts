import * as Sequelize from 'sequelize'
import { IModelMap } from '.';

export const orderModel: IModelMap = {
  tableName: 'orders',
  attributes: {
    name: {
      type: Sequelize.STRING,
    },
  },
};
