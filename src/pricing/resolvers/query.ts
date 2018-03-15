import { IContext } from '../../routes';

// {
//   getPricing(
//     sourceLocation:{lat:1, lng:2}
//     destLocation:{lat:1, lng:2}
//   )
// }
export const Query = {
  // TODO
  getPricing: async (value, { sourceLocation, destLocation }, { components }: IContext)  => {
    return 15.23
  },
}
