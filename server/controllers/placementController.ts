import { Request, RequestHandler, Response } from 'express'
import PlacementService from '../services/placementService'
import { getBadge, placementSideNavArray, subNavArray } from '../utils/residentUtils'
import previousApStaySummaryListRows from '../utils/previousApStaysUtils'

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
        sectionHeading: 'Placement information',
      })
    }
  }

  previousAp(): RequestHandler {
    return async (req: Request, res: Response) => {
      const { residentId } = req.params
      const token = res.locals?.user?.token

      const resident = this.placementService.getResident()

      const headerResident = {
        ...resident,
        badges: resident.badges.map(badge => getBadge(badge.text, badge.colour)),
      }

      const previousApStays = token ? await this.placementService.getPreviousApStays(token, residentId) : []

      const previousApStaysWithSummaryRows = previousApStays.map(stay => ({
        ...stay,
        summaryListRows: previousApStaySummaryListRows(stay),
      }))

      res.render('residents/placement', {
        resident: headerResident,
        subNavArray: subNavArray(residentId, 'Placement'),
        sideNavArray: placementSideNavArray(residentId, 'Previous AP stays'),
        sectionHeading: 'Previous AP stays',
        previousApStays: previousApStaysWithSummaryRows,
      })
    }
  }
}
