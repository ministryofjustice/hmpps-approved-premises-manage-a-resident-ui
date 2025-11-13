/* istanbul ignore file */

import { type RequestHandler, Router } from 'express'
import asyncMiddleware from '../middleware/asyncMiddleware'

type RoutingFunction = (path: string | string[], handler: RequestHandler) => Router

type Actions = {
  get: RoutingFunction
  post: RoutingFunction
  put: RoutingFunction
  patch: RoutingFunction
}

export function actions(router: Router): Actions {
  return {
    get: (path: string | string[], handler: RequestHandler) => router.get(path, asyncMiddleware(handler)),
    post: (path: string | string[], handler: RequestHandler) => router.post(path, asyncMiddleware(handler)),
    put: (path: string | string[], handler: RequestHandler) => router.put(path, asyncMiddleware(handler)),
    patch: (path: string | string[], handler: RequestHandler) => router.patch(path, asyncMiddleware(handler)),
  }
}

export function compose(sourceActions: Actions, middleware: (handler: RequestHandler) => RequestHandler): Actions {
  return {
    get: (path: string | string[], handler: RequestHandler) => sourceActions.get(path, middleware(handler)),
    post: (path: string | string[], handler: RequestHandler) => sourceActions.post(path, middleware(handler)),
    put: (path: string | string[], handler: RequestHandler) => sourceActions.put(path, middleware(handler)),
    patch: (path: string | string[], handler: RequestHandler) => sourceActions.patch(path, middleware(handler)),
  }
}
