import { Query } from './query'
import { Mutation } from './mutation'
import { IContext } from '../../routes'

const carriers = {
  1: {
    id: '1',
    imageUrl: 'https://unsplash.it/300x300?image=1',
    name: 'Carrier 1',
  },
  2: {
    id: '2',
    imageUrl: 'https://unsplash.it/300x300?image=2',
    name: 'Carrier 2',
  },
  3: {
    id: '3',
    imageUrl: 'https://unsplash.it/300x300?image=3',
    name: 'Carrier 3',
  },
}
export default {
  Query,
  Mutation,
  Order: {
    carrier: async (value, args, ctx: IContext) => {
      if (!value.carrierId) {
        return null
      }
      return carriers[value.carrierId]
    },
  },
}
