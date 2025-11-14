import { RestClient } from '@ministryofjustice/hmpps-rest-client'
import { AuthenticationClient } from '@ministryofjustice/hmpps-auth-clients'
import config from '../config'
import logger from '../../logger'

export default class PlacementClient extends RestClient {
  constructor(authClient: AuthenticationClient) {
    super('Placement', config.apis.exampleApi, logger, authClient)
  }
}
