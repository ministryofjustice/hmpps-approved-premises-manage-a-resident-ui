import { Request, RequestHandler, Response } from 'express'

export default class PlacementController {
  static index(): RequestHandler {
    return (req: Request, res: Response) => {
      res.render('residents/placement', {})
    }
  }
}
