import { ManageAResidentClient } from '../data'
import { PreviousApStay, Resident } from '../@types/placementTypes'

export default class PlacementService {
  constructor(private readonly manageAResidentClient: ManageAResidentClient) {}

  getResident(): Resident {
    return this.manageAResidentClient.getResident()
  }

  getPreviousApStays(token: string, personId: string): Promise<Array<PreviousApStay>> {
    return this.manageAResidentClient.getPreviousApStays(token, personId)
  }
}
