import { Router } from 'express'

import { ensureAuthenticatedClient } from './middlewares/ensureAuthenticatedClient'
import { ensureAuthenticatedDeliveryman } from './middlewares/ensureAuthenticatedDeliveryman'
import { AuthenticateClientController } from './modules/account/useCases/authenticateClient/AuthenticateClientController'
import { AuthenticateDeliverymanController } from './modules/account/useCases/authenticateDeliveryman/AuthenticateDeliverymanController'
import { CreateClientController } from './modules/clients/useCases/createClient/CreateClientController'
import { CreateDeliveryController } from './modules/deliveries/useCases/createDelivery/CreateDeliveryController'
import { FindAllAvailableController } from './modules/deliveries/useCases/findAllAvailable/FindAllAvailableController'
import { CreateDeliverymanController } from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController'

const routes = Router()

const authenticateClientController = new AuthenticateClientController()
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController()
const createClientController = new CreateClientController()
const createDeliverymanController = new CreateDeliverymanController()
const createDeliveryController = new CreateDeliveryController()
const findAllAvailableController = new FindAllAvailableController()

routes.post('/client/authenticate', authenticateClientController.handle)
routes.post('/client', createClientController.handle)

routes.post(
  '/deliveryman/authenticate',
  authenticateDeliverymanController.handle
)
routes.post('/deliveryman', createDeliverymanController.handle)

routes.post(
  '/delivery',
  ensureAuthenticatedClient,
  createDeliveryController.handle
)

routes.get(
  '/delivery/available',
  ensureAuthenticatedDeliveryman,
  findAllAvailableController.handle
)

export { routes }
