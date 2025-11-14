import ManageAResidentClient from '../data/manageAResidentClient'
import ExampleService from './exampleService'

jest.mock('../data/manageAResidentClient')

describe('ExampleService', () => {
  const manageAResidentClient = new ManageAResidentClient(null) as jest.Mocked<ManageAResidentClient>
  let exampleService: ExampleService

  beforeEach(() => {
    exampleService = new ExampleService(manageAResidentClient)
  })

  it('should call getCurrentTime on the api client and return its result', async () => {
    const expectedResponse = {
      message: 'Hello world',
    }
    manageAResidentClient.getHelloWorld.mockResolvedValue(expectedResponse)

    const result = await exampleService.getHelloWorld('some token')

    expect(manageAResidentClient.getHelloWorld).toHaveBeenCalledTimes(1)
    expect(result).toEqual(expectedResponse)
  })
})
