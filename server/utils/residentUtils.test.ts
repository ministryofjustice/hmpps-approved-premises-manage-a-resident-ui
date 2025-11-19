import { getBadge, placementSideNavArray, subNavArray } from './residentUtils'
import { BadgeColour } from '../@types/placementTypes'

describe('ResidentUtils', () => {
  describe('getBadge', () => {
    it.each([
      ['Badge 1', 'black', 'moj-badge--black'],
      ['Badge 2', 'red', 'moj-badge--red'],
      ['Badge 3', 'purple', 'moj-badge--purple'],
    ])(
      'should return a span with the correct badge classes',
      (text: string, colour: BadgeColour, colourClass: string) => {
        expect(getBadge(text, colour)).toEqual(`<span class="moj-badge ${colourClass}">${text}</span>`)
      },
    )
  })

  describe('subNavArray', () => {
    const residentId = '5ba36c97-a292-4f39-a940-cfb9730989ad'

    it('should return the sub nav array with the Health tab active', () => {
      expect(subNavArray(residentId, 'Health')).toEqual([
        { text: 'Personal', href: '#', active: false },
        { text: 'Health', href: '#', active: true },
        { text: 'Placement', href: `/residents/${residentId}/placement`, active: false },
        { text: 'Offence and sentence', href: '#', active: false },
        { text: 'Enforcement', href: '#', active: false },
      ])
    })
  })

  describe('placementSideNavArray', () => {
    const residentId = 'cd4bd419-a759-4dff-bc37-d00cd9191ece'

    it('should return the placement side nav array with the Previous AP stays tab active', () => {
      expect(placementSideNavArray(residentId, 'Previous AP stays')).toEqual([
        { text: 'Placement information', href: `/residents/${residentId}/placement`, active: false },
        { text: 'Previous AP stays', href: `/residents/${residentId}/placement/previous-ap`, active: true },
      ])
    })
  })
})
