import { system } from '../src/system'
import { IComponents } from '../src/index'
import { HttpMethods, HttpClient } from '../src/components/http'
import * as jest from 'jest'
import { PostgresComponent } from '../src/components/postgres'

describe('http', () => {
  it('fetches', async () => {
    const components: IComponents = await system.start() as IComponents
    const httpClient = new HttpClient()
    httpClient.start({
      config: {
        postgres: new PostgresComponent(),
        // config: '',
        // service: '',
        // models: '',
        // http: '',
        // distanceService: '',
        // token: '',
        // sqsProducer: '',
      },
    })
    console.log(components)
    const response = await components.http.fetch({
      method: HttpMethods.get,
      service: 'payments',
      path: 'stubPath',
      data: {stubData: null},
    })
    console.log(response)
  })
})
