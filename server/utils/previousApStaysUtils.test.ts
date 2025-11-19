import previousApStaySummaryListRows from './previousApStaysUtils'
import type { PreviousApStay } from '../@types/placementTypes'

describe('previousApStaySummaryListRows', () => {
  it('builds summary list rows for a previous AP stay', () => {
    const stay: PreviousApStay = {
      name: 'Elmswood House',
      arrivalDate: '2023-10-10',
      departureDate: '2024-03-20',
      departureReason: 'Breach or recall - Licence or bail conditions',
      departureReasonNotes: 'Resident recalled following breach of licence conditions',
    }

    const rows = previousApStaySummaryListRows(stay)

    expect(rows).toEqual([
      {
        key: { text: 'Arrival date' },
        value: { text: stay.arrivalDate },
      },
      {
        key: { text: 'Departure date' },
        value: { text: stay.departureDate },
      },
      {
        key: { text: 'Departure reason' },
        value: { text: stay.departureReason },
      },
      {
        key: { text: 'Departure reason notes' },
        value: { text: stay.departureReasonNotes },
      },
    ])
  })
})
