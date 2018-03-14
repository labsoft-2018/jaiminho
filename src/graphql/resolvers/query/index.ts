import { IContext } from '../../../routes'
import * as Sequelize from 'sequelize'

export const unwrapInstance = <T>(instance: Sequelize.Instance<T> | null): T | null => instance ? instance.toJSON() : null

export const query = {
  hello: (parent, args, ctx: IContext) => {
    console.log(ctx)
    return 'Hello!'
  },
  order: async (parent, { id }: {id: string}, ctx: IContext) => {
    const order = await ctx.components.models.getModels().order.findOne({
      where: {
        id,
      },
    })
    return unwrapInstance(order)
  },
}
