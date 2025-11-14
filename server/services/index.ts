import { dataAccess } from '../data'
import AuditService from './auditService'
import ExampleService from './exampleService'
import PlacementService from './placementService'

export const services = () => {
  const { applicationInfo, hmppsAuditClient, manageAResidentClient } = dataAccess()

  return {
    applicationInfo,
    auditService: new AuditService(hmppsAuditClient),
    exampleService: new ExampleService(manageAResidentClient),
    placementService: new PlacementService(manageAResidentClient),
  }
}

export type Services = ReturnType<typeof services>
