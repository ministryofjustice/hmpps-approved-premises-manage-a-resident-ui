import { dataAccess } from '../data'
import AuditService from './auditService'
import ExampleService from './exampleService'
import PlacementService from './placementService'

export const services = () => {
  const { applicationInfo, placementClient, residentClient, hmppsAuditClient, exampleApiClient } = dataAccess()

  return {
    applicationInfo,
    auditService: new AuditService(hmppsAuditClient),
    exampleService: new ExampleService(exampleApiClient),
    placementService: new PlacementService(placementClient, residentClient),
  }
}

export type Services = ReturnType<typeof services>
