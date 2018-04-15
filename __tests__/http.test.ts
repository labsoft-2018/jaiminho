import { IComponents } from '../src/index'
import { HttpMethods, HttpClient } from '../src/components/http'

const components = {
  config: {
    getConfig: () => ({
      postgres: {
        database: '',
        username: '',
        password: '',
        host: '',
        port: 1234,
      },
      services: {
        auth: 'https://auth',
        payments: 'https://payments',
      },
      service: {
        port: 0,
        name: '',
        password: '',
      },
      token: {
        issuer: '',
        audience: '',
        jwtDuration: '',
        bucketName: '',
        publicKeyPath: '',
        privateKeyPath: '',
      },
      google: {}
    })
  },
}

describe('http', () => {
  it('fetches a token', async () => {
    const httpClient = new HttpClient()
    httpClient.start(components as IComponents)
    const response = await httpClient.getToken()
    expect(await response).toEqual('mockToken')
  })

  it('fetches', async () => {
    const httpClient = new HttpClient()
    httpClient.start(components as IComponents)
    const response = await httpClient.fetch({
      method: HttpMethods.get,
      service: 'payments',
      path: 'stubPath',
      data: {stubData: null},
    })
  })
})
