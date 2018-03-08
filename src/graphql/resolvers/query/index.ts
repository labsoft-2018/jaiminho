import { IContext } from '../../../routes'

export const query = {
  hello: (parent, args, ctx: IContext) => {
    console.log(ctx)
    return 'Hello!'
  }
}