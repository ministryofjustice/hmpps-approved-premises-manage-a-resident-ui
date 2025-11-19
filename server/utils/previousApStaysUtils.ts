import type { PreviousApStay, SummaryListRows } from '../@types/placementTypes'

const textValue = (value: string) => ({ text: value })

const previousApStaySummaryListRows = (stay: PreviousApStay): SummaryListRows => {
  return [
    {
      key: textValue('Arrival date'),
      value: textValue(stay.arrivalDate),
    },
    {
      key: textValue('Departure date'),
      value: textValue(stay.departureDate),
    },
    {
      key: textValue('Departure reason'),
      value: textValue(stay.departureReason),
    },
    {
      key: textValue('Departure reason notes'),
      value: textValue(stay.departureReasonNotes ?? ''),
    },
  ]
}

export default previousApStaySummaryListRows
