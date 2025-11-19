import { NextFunction, Request, Response } from 'express'
import { createMock } from '@golevelup/ts-jest'
import PlacementService from '../services/placementService'
import PlacementController from './placementController'
import { Resident } from '../@types/placementTypes'
import previousApStaySummaryListRows from '../utils/previousApStaysUtils'

describe('PlacementController', () => {
  let request: Request
  const response = createMock<Response>({})
  const next = createMock<NextFunction>({})

  const placementService = createMock<PlacementService>({})

  const placementController = new PlacementController(placementService)
  const requestHandler = placementController.index()

  const residentId = 'a8421fe3-3be8-49ee-b160-1ca0095b356b'

  beforeEach(() => {
    request = createMock<Request>({
      params: { residentId },
    })
  })

  describe('index', () => {
    const resident: Resident = {
      name: 'Joe Bloggs',
      photoUrl: 'example.com/joe-bloggs.jpg',
      badges: [
        { text: 'First', colour: 'red' },
        { text: 'Second', colour: 'purple' },
        { text: 'Third', colour: 'black' },
      ],
      attributes: [
        { title: 'Attribute 1', description: 'Description for attribute 1' },
        { title: 'Attribute 2', description: 'Description for attribute 2' },
      ],
    }

    placementService.getResident.mockReturnValue(resident)

    it('should return the resident formatted for the header', async () => {
      await requestHandler(request, response, next)

      expect(response.render).toHaveBeenCalledWith(
        'residents/placement',
        expect.objectContaining({
          resident: {
            name: 'Joe Bloggs',
            photoUrl: 'example.com/joe-bloggs.jpg',
            badges: [
              `<span class="moj-badge moj-badge--red">First</span>`,
              `<span class="moj-badge moj-badge--purple">Second</span>`,
              `<span class="moj-badge moj-badge--black">Third</span>`,
            ],
            attributes: [
              { title: 'Attribute 1', description: 'Description for attribute 1' },
              { title: 'Attribute 2', description: 'Description for attribute 2' },
            ],
          },
        }),
      )
    })

    it('should return the sub nav array with the placement tab active', async () => {
      await requestHandler(request, response, next)

      expect(response.render).toHaveBeenCalledWith(
        'residents/placement',
        expect.objectContaining({
          subNavArray: [
            { text: 'Personal', href: '#', active: false },
            { text: 'Health', href: '#', active: false },
            { text: 'Placement', href: `/residents/${residentId}/placement`, active: true },
            { text: 'Offence and sentence', href: '#', active: false },
            { text: 'Enforcement', href: '#', active: false },
          ],
        }),
      )
    })

    it('should return the side nav array with the placement information tab active', async () => {
      await requestHandler(request, response, next)

      expect(response.render).toHaveBeenCalledWith(
        'residents/placement',
        expect.objectContaining({
          sideNavArray: [
            { text: 'Placement information', href: `/residents/${residentId}/placement`, active: true },
            { text: 'Previous AP stays', href: `/residents/${residentId}/placement/previous-ap`, active: false },
          ],
        }),
      )
    })
  })
  describe('previousAp', () => {
    const token = 'test-user-token'
    const previousApStays = [
      {
        name: 'Elmswood House',
        arrivalDate: '2023-10-10',
        departureDate: '2024-03-20',
        departureReason: 'Breach or recall - Licence or bail conditions',
        departureReasonNotes: 'Resident recalled following breach of licence conditions',
      },
    ]

    beforeEach(() => {
      response.locals = {
        user: { token },
      } as never

      placementService.getPreviousApStays.mockResolvedValue(previousApStays)
    })

    it('should fetch and render previous AP stays with summary list rows', async () => {
      const previousApRequestHandler = placementController.previousAp()

      await previousApRequestHandler(request, response, next)

      expect(placementService.getPreviousApStays).toHaveBeenCalledWith(token, residentId)
      expect(response.render).toHaveBeenCalledWith(
        'residents/placement',
        expect.objectContaining({
          previousApStays: [
            {
              ...previousApStays[0],
              summaryListRows: previousApStaySummaryListRows(previousApStays[0]),
            },
          ],
        }),
      )
    })
  })
})
