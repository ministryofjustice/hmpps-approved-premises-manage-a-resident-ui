import { Router } from 'express'

import type { Services } from '../services'
import { Page } from '../services/auditService'
import { actions } from './utils'
import PlacementController from '../controllers/placementController'
import paths from '../paths'

export default function routes({ auditService, exampleService }: Services): Router {
  const router = Router()

  const { get } = actions(router)

  get(paths.placements.index.pattern, PlacementController.index())

  router.get('/', async (req, res, next) => {
    await auditService.logPageView(Page.EXAMPLE_PAGE, { who: res.locals.user.username, correlationId: req.id })

    const token = res.locals?.user?.token
    const helloWorldData = await exampleService.getHelloWorld(token)
    return res.render('pages/index', { helloWorldData })
  })

  return router
}
