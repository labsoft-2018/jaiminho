import { IRequest, IUser } from '../routes'

const userFromReq = async (req: IRequest) => {
  const authorization = req.headers && req.headers.Authorization as string
  if (authorization) {
    const decoded = await req.components.token.decode<IUser>(authorization)
    return {
      id: decoded.id,
      scopes: decoded.scopes || [],
    }
  }
  return null
}

export const reqToContext = async (req: IRequest) => {
  return {
    components: req.components,
    user: await userFromReq(req),
  }
}
