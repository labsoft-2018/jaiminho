import { combineResolvers } from 'graphql-resolvers'
import { scopes } from '../../interceptors/auth';
import { ILocation } from '../../common/model';
import { IContext } from '../../routes';
import { createOrder } from '../controller';
import { OrderStatus } from '../model'

export interface IPaymentInfoInput {
  cardId: string
}

export interface IOrderInput {
  sourceLocation: ILocation
  destLocation: ILocation
  deliveryInstructions: string
  withdrawalInstructions: string
  contactNumber: string
}

export interface ICreateOrderArgs {
  input: {
    order: IOrderInput,
    paymentInfo: IPaymentInfoInput,
  }
}

export interface IConfirmOrder {
  input: {
    magicWord: string,
    orderId: string,
  }
}

export const Mutation = {
  createOrder: combineResolvers(
    scopes(['admin', 'costumer']),
    async (parent, { input }: ICreateOrderArgs, ctx: IContext) => {
      return createOrder(input.order, input.paymentInfo, ctx.user.id, ctx.components)
    },
  )
  confirmOrder: combineResolvers(
    scopes(['customer']),
    async (parent, { input }: IConfirmOrder, ctx: IContext) => {
      const { order: orderModel } = ctx.components.models.getModels()
      const { magicWord, orderId } = input
      console.log(ctx.user.id)
      const order = await orderModel.findOne({
        where: {
          id: orderId,
          magicWord,
        },
      })

      if (!order) {
        throw new Error('Invalid order')
      }

      const update = await orderModel.update({
        status: OrderStatus.DELIVERED,
      }, {
        where: {
          id: order.get('id'),
        },
      })

      return {
        order: order.toJSON(),
      }
    },
  ),
}
