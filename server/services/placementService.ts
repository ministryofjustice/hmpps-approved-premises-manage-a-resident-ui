import { ManageAResidentClient } from '../data'
import { Resident } from '../@types/placementTypes'

export default class PlacementService {
  constructor(private readonly manageAResidentClient: ManageAResidentClient) {}

  getResident(): Resident {
    return this.manageAResidentClient.getResident()
  }
}
