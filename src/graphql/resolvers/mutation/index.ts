import { IContext } from '../../../routes'
import { ILocation, OrderType, OrderStatus } from '../../../models/order'

export interface ICreateOrderArgs {
  input: {
    sourceLocation: ILocation
    destLocation: ILocation
    type: OrderType
    deliveryInstructions: string
    withdrawalInstructions: string
    contactNumber: string,
  }
}

// TODO
const getRandomMagicWord = () => 'beijo-no-cu'

export const mutation = {
  createOrder: async (parent, { input }: ICreateOrderArgs, ctx: IContext) => {
    const order = await ctx.components.models.getModels().order.create({
      sourceLat: input.sourceLocation.lat,
      sourceLng: input.sourceLocation.lng,
      destLat: input.destLocation.lat,
      destLng: input.destLocation.lng,
      type: input.type,
      deliveryInstructions: input.deliveryInstructions,
      withdrawalInstructions: input.withdrawalInstructions,
      contactNumber: input.contactNumber,
      status: OrderStatus.ORDERED,
      magicWord: getRandomMagicWord(),
      customerId: ctx.user.id,
    })
    return order ? order.toJSON() : null
  },
}
