import ManageAResidentClient from '../data/manageAResidentClient'

export default class ExampleService {
  constructor(private readonly exampleApiClient: ManageAResidentClient) {}

  getHelloWorld(token: string) {
    return this.exampleApiClient.getHelloWorld(token)
  }
}
