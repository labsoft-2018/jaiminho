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
  contactNumber: string,
}

export interface ICreateOrderArgs {
  input: {
    order: IOrderInput,
    paymentInfo: IPaymentInfoInput,
  }
}

export const Mutation = {
  createOrder: async (parent, { input }: ICreateOrderArgs, ctx: IContext) => {
    console.log(input)
    return createOrder(input.order, input.paymentInfo, ctx.components)
  },
}
