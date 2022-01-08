import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { prisma } from '../../../../database/prismaClient'

interface IAuthenticateClient {
  username: string
  password: string
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    const client = await prisma.clients.findFirst({
      where: {
        username,
      },
    })

    if (!client) {
      throw new Error('Invalid username or password!')
    }

    const isPasswordValid = await compare(password, client.password)

    if (!isPasswordValid) {
      throw new Error('Invalid username or password!')
    }

    const token = sign(
      { username },
      '389c6be0081c07880fba4862ee14e857a93e3cd3b91695bb6b9c816c2f0baab9',
      {
        subject: client.id,
        expiresIn: '1d',
      }
    )

    return token
  }
}
