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
})
