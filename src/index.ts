import { system } from './system'
import { routes } from './routes'
import { IPostgresComponent } from './components/postgres'
import { IConfigComponent } from './components/config'
import { IService } from './components/service';
import { IModelsComponent } from './components/models'
import { IModels } from './models'
import { IHttpClient } from './components/http'
import { IDistanceService } from './components/distance-api'

export interface IComponents {
  postgres: IPostgresComponent,
  config: IConfigComponent,
  service: IService,
  models: IModelsComponent<IModels>,
  http: IHttpClient,
  distanceService: IDistanceService,
}

const main = async () => {
  await system.start()
}

main()
.catch((err) => {
  console.log(err)
  process.exit(1)
})
