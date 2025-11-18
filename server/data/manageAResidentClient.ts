import { RestClient, asUser } from '@ministryofjustice/hmpps-rest-client'
import type { AuthenticationClient } from '@ministryofjustice/hmpps-auth-clients'
import config from '../config'
import logger from '../../logger'
import { HelloWorldData } from '../interfaces/helloWorldData'
import { PreviousApStay, Resident } from '../@types/placementTypes'

export default class ManageAResidentClient extends RestClient {
  constructor(authenticationClient: AuthenticationClient) {
    super('Single Accommodation Service (SAS) API', config.apis.manageAResidentApi, logger, authenticationClient)
  }

  getHelloWorld(token: string): Promise<HelloWorldData> {
    return this.get({ path: '/hello-world' }, asUser(token))
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

  // TODO: Uncomment the bellow to use the real endpoint once it is ready
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getPreviousApStays(personId: string, token: string): Promise<Array<PreviousApStay>> {
    // const path = `/person/${personId}/profile/cas1/placements`
    // return this.get({ path }, asUser(token))
    return Promise.resolve([
      {
        name: 'Elmswood House',
        arrivalDate: '2023-10-10',
        departureDate: '2024-03-20',
        departureReason: 'Breach or recall - Licence or bail conditions',
        departureReasonNotes: 'Resident recalled following breach of licence conditions',
      },
    ])
  }
}
