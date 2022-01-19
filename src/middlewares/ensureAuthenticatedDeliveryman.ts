import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string
}
export async function ensureAuthenticatedDeliveryman(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({
      message: 'Token missing!',
    })
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: id_deliveryman } = verify(
      token,
      '6e5a743837a1457a7b9342390e99e8c1d85959dd7844ccb70afa5d466f5cc56f'
    ) as IPayload

    req.id_deliveryman = id_deliveryman

    return next()
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid token!',
    })
  }
}
