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
      '6e5a743837a1457a7b9342390e99e8c1d85959dd7844ccb70afa5d466f5cc56f',
      {
        subject: deliveryman.id,
        expiresIn: '1d',
      }
    )

    return token
  }
}
