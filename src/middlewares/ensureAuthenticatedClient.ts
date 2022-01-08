import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string
}
export async function ensureAuthenticatedClient(
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
    const { sub: id_client } = verify(
      token,
      '389c6be0081c07880fba4862ee14e857a93e3cd3b91695bb6b9c816c2f0baab9'
    ) as IPayload

    req.id_client = id_client

    return next()
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid token!',
    })
  }
}
