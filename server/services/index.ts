import { dataAccess } from '../data'
import AuditService from './auditService'
import ExampleService from './exampleService'
import PlacementService from './placementService'

export const services = () => {
  const { hmppsAuditClient, manageAResidentClient } = dataAccess()

  return {
    auditService: new AuditService(hmppsAuditClient),
    exampleService: new ExampleService(manageAResidentClient),
    placementService: new PlacementService(manageAResidentClient),
  }
}

export type Services = ReturnType<typeof services>
