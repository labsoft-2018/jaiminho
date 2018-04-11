import { IContext } from '../../routes'
import { getAllocatedOrdersByUserId, getOrderById } from '../database'

export const Query = {
  order: (parent, { id }: {id: string}, ctx: IContext) => {
    return getOrderById(ctx.components.models.getModels().order, id)
  },
  isTrackingAuthorized: async (parent, { userId, carrierId }: {userId: string, carrierId: string}, ctx: IContext) => {
    return (await getAllocatedOrdersByUserId(ctx.components.models.getModels().order, userId)).length > 0  // FIXME: check carrierId
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
