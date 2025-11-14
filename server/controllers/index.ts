import { services } from '../services'
import PlacementController from './placementController'

export default function controllers() {
  const { placementService } = services()

  return {
    placementController: new PlacementController(placementService),
  }
}
