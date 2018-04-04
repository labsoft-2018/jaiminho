import { system } from './system'
import { routes } from './routes'
import { IPostgresComponent } from './components/postgres'
import { IConfigComponent } from './components/config'
import { IService } from './components/service'
import { IModelsComponent } from './components/models'
import { IModels } from './models'
import { IHttpClient } from './components/http'
import { IDistanceService } from './components/distance-api'
import { ITokenComponent } from './components/token'
import { ISQSProducer } from './components/producer'

export interface IComponents {
  postgres: IPostgresComponent,
  config: IConfigComponent,
  service: IService,
  models: IModelsComponent<IModels>,
  http: IHttpClient,
  distanceService: IDistanceService,
  token: ITokenComponent,
  sqsProducer: ISQSProducer,
}

const main = async () => {
  const components = await system.start()
  console.log(await components.token.encode({
    id: '1',
    scopes: ['admin'],
  }))
}

main()
.catch((err) => {
  console.log(err)
  process.exit(1)
})
