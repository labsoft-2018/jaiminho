import { IContext } from '../../routes';
import { getOrderById } from '../database'

export const Query = {
  order: (parent, { id }: {id: string}, ctx: IContext) => {
    console.log(id)
    return getOrderById(ctx.components.models.getModels().order, id)
  },
}
