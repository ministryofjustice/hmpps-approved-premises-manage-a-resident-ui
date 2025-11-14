import PlacementClient from '../data/placementClient'
import ResidentClient from '../data/residentClient'
import { Resident } from '../@types/placementTypes'

export default class PlacementService {
  constructor(
    private readonly placementClient: PlacementClient,
    private readonly residentClient: ResidentClient,
  ) {}

  getResident(): Resident {
    return this.residentClient.getResident()
  }
}
