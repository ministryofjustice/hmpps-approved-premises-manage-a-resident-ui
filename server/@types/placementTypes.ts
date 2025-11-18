type BadgeColour = 'red' | 'purple' | 'black'

type Badge = {
  text: string
  colour: BadgeColour
}

type Attribute = {
  title: string
  description: string
}

type Resident = {
  name: string
  photoUrl: string
  badges: Array<Badge>
  attributes: Array<Attribute>
}

type PreviousApStay = {
  name: string
  arrivalDate: string
  departureDate: string
  departureReason: string
  departureReasonNotes?: string
}

export type { BadgeColour, Resident, PreviousApStay }
