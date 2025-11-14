import { Router } from 'express'

import type { Services } from '../services'
import { Page } from '../services/auditService'
import { actions } from './utils'
import paths from '../paths'
import controllers from '../controllers'

export default function routes(services: Services): Router {
  const router = Router()

  const { get } = actions(router)

  const { placementController } = controllers()

  get(paths.placements.index.pattern, placementController.index())

  router.get('/', async (req, res, next) => {
    await services.auditService.logPageView(Page.EXAMPLE_PAGE, { who: res.locals.user.username, correlationId: req.id })

    const currentTime = await services.exampleService.getCurrentTime()

    return res.render('pages/index', { currentTime })
  })

  return router
}
