import { IContext } from '../../routes'
import { getAllocatedOrders, getOrderById } from '../database'

export const Query = {
  order: (parent, { id }: {id: string}, ctx: IContext) => {
    return getOrderById(ctx.components.models.getModels().order, id)
  },
  isTrackingAuthorized: async (parent, { userId, carrierId }: {userId: string, carrierId: string}, ctx: IContext) => {
    return (await getAllocatedOrders(ctx.components.models.getModels().order, userId, carrierId)).length > 0
  },
  myOrders: async (value, args, ctx: IContext) => {
    const orders = await ctx.components.models.getModels().order.findAll({
      where: {
        userId: ctx.user.id,
      },
    })
    return orders
  },
}
