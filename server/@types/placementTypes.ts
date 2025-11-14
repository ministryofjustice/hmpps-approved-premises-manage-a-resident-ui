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

export type { BadgeColour, Resident }
