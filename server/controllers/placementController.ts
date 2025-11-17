import { Request, RequestHandler, Response } from 'express'
import PlacementService from '../services/placementService'
import { getBadge, placementSideNavArray, subNavArray } from '../utils/residentUtils'

export default class PlacementController {
  constructor(private readonly placementService: PlacementService) {}

  index(): RequestHandler {
    return (req: Request, res: Response) => {
      const { residentId } = req.params

      const resident = this.placementService.getResident()

      const headerResident = {
        ...resident,
        badges: resident.badges.map(badge => getBadge(badge.text, badge.colour)),
      }

      res.render('residents/placement', {
        resident: headerResident,
        subNavArray: subNavArray(residentId, 'Placement'),
        sideNavArray: placementSideNavArray(residentId, 'Placement information'),
      })
    }
  }
}
