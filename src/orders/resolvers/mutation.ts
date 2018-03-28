import { combineResolvers } from 'graphql-resolvers'
import { scopes } from '../../interceptors/auth';
import { ILocation } from '../../common/model';
import { IContext } from '../../routes';
import { createOrder } from '../controller';

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

export const Mutation = {
  createOrder: combineResolvers(
    scopes(['admin', 'costumer']),
    async (parent, { input }: ICreateOrderArgs, ctx: IContext) => {
      return createOrder(input.order, input.paymentInfo, ctx.user.id, ctx.components)
    },
  )
}
