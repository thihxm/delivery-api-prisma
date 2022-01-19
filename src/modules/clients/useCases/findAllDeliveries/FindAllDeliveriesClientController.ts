import { Request, Response } from 'express'

import { FindAllDeliveriesClientUseCase } from './FindAllDeliveriesClientUseCase'

export class FindAllDeliveriesClientController {
  async handle(req: Request, res: Response) {
    const { id_client } = req

    const findAllDeliveriesUseCase = new FindAllDeliveriesClientUseCase()

    const deliveries = await findAllDeliveriesUseCase.execute(id_client)

    return res.json(deliveries)
  }
}
