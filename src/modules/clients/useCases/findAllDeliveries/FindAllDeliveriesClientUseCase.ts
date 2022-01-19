import { prisma } from '../../../../database/prismaClient'

export class FindAllDeliveriesClientUseCase {
  async execute(id_client: string) {
    const deliveries = await prisma.clients.findUnique({
      where: {
        id: id_client,
      },
      select: {
        id: true,
        username: true,
        deliveries: true,
      },
    })

    return deliveries
  }
}
