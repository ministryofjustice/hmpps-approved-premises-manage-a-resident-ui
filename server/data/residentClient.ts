import { RestClient } from '@ministryofjustice/hmpps-rest-client'
import { AuthenticationClient } from '@ministryofjustice/hmpps-auth-clients'
import { Resident } from '../@types/placementTypes'
import config from '../config'
import logger from '../../logger'

export default class ResidentClient extends RestClient {
  constructor(authClient: AuthenticationClient) {
    super('Resident', config.apis.exampleApi, logger, authClient)
  }

  getResident(): Resident {
    return {
      name: 'Oscar Hills',
      photoUrl: '/assets/images/thispersondoesnotexist1.jpg',
      badges: [
        { text: 'High RoSH', colour: 'red' },
        { text: 'CAT2/LEVEL 1 MAPPA', colour: 'purple' },
        { text: 'Arson', colour: 'black' },
        { text: 'Weapons', colour: 'black' },
        { text: 'Sexual Offence', colour: 'black' },
      ],
      attributes: [
        { title: 'CRN', description: 'A123XYZ' },
        { title: 'Approved Premises', description: 'Albion Street' },
        { title: 'Key worker', description: 'Ava Thompson' },
        { title: 'Room', description: '1A' },
        { title: 'Arrival', description: '1 Oct 2025' },
        { title: 'Departure', description: '1 Jan 2026' },
        { title: 'Status', description: 'Arrived' },
        { title: 'Length of stay', description: '12 weeks' },
      ],
    }
  }
}
