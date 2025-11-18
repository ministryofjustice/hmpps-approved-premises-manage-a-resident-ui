import nock from 'nock'
import type { AuthenticationClient } from '@ministryofjustice/hmpps-auth-clients'
import ManageAResidentClient from './manageAResidentClient'
import config from '../config'

describe('ManageAResidentClient', () => {
  let manageAResidentClient: ManageAResidentClient
  let mockAuthenticationClient: jest.Mocked<AuthenticationClient>

  beforeEach(() => {
    mockAuthenticationClient = {
      getToken: jest.fn().mockResolvedValue('test-system-token'),
    } as unknown as jest.Mocked<AuthenticationClient>

    manageAResidentClient = new ManageAResidentClient(mockAuthenticationClient)
  })

  afterEach(() => {
    nock.cleanAll()
    jest.resetAllMocks()
  })

  describe('getHelloWorld', () => {
    it('should make a GET request to /example/time using system token and return the response body', async () => {
      const token = 'test-user-token'
      nock(config.apis.manageAResidentApi.url)
        .get('/hello-world')
        .matchHeader('authorization', `Bearer ${token}`)
        .reply(200, { message: 'Hello World!' })

      const response = await manageAResidentClient.getHelloWorld(token)

      expect(response).toEqual({ message: 'Hello World!' })
    })
  })

  describe('getPreviousApStays', () => {
    it('should return the previous AP stays for a persons', async () => {
      const token = 'test-user-tokenn'
      const personId = '111111'
      const expectedResponse = [
        {
          name: 'Elmswood House',
          arrivalDate: '2023-10-10',
          departureDate: '2024-03-20',
          departureReason: 'Breach or recall - Licence or bail conditions',
          departureReasonNotes: 'Resident recalled following breach of licence conditions',
        },
      ]

      const response = await manageAResidentClient.getPreviousApStays(personId, token)

      expect(response).toEqual(expectedResponse)
    })
  })
})
