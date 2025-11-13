import { path } from 'static-path'

const residentsPath = path('/residents')
const residentPath = residentsPath.path(':residentId')

const placementPath = residentPath.path('placement')

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const paths: Record<string, any> = {
  placements: {
    index: placementPath,
    previousAp: placementPath.path('previous-ap'),
  },
}

export default paths

// /resident/:residentId/placement
// /resident/:residentId/placement/previous-ap
