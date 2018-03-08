import * as Sequelize from 'sequelize'
import { IModelMap } from '.';

export const deliveryModel: IModelMap = {
  tableName: 'deliveries',
  attributes: {
    name: {
      type: Sequelize.STRING,
    },
  },
};
