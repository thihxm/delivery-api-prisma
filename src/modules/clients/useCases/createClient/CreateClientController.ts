import { Request, Response } from 'express'

import { CreateClientUseCase } from './CreateClientUseCase'

export class CreateClientController {
  async handle(req: Request, res: Response) {
    const { username, password } = req.body

    const createClientUseCase = new CreateClientUseCase()
    const client = await createClientUseCase.execute({
      username,
      password,
    })

    return res.json(client)
  }
}
