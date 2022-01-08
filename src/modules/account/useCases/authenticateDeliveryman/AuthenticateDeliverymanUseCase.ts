import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { prisma } from '../../../../database/prismaClient'

interface IAuthenticateDeliveryman {
  username: string
  password: string
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username,
      },
    })

    if (!deliveryman) {
      throw new Error('Invalid username or password!')
    }

    const isPasswordValid = await compare(password, deliveryman.password)

    if (!isPasswordValid) {
      throw new Error('Invalid username or password!')
    }

    const token = sign(
      { username },
      '389c6be0081c07880fba4862ee14e857a93e3cd3b91695bb6b9c816c2f0baab9',
      {
        subject: deliveryman.id,
        expiresIn: '1d',
      }
    )

    return token
  }
}
