
import { routes } from './routes';
import { PostgresComponent, IPostgresComponent } from './components/postgres'
import { IComponentMap, System } from './components/system'
import { ConfigComponent, ENV, IConfigComponent } from './components/config'
import { ExpressService, IService } from './components/service';
import { ModelsComponent, IModelsComponent } from './components/models'
import { modelDescriptionMap, IModels } from './models'

export interface IComponents {
  postgres: IPostgresComponent,
  config: IConfigComponent,
  service: IService,
  models: IModelsComponent<IModels>,
}

const componentMap: IComponentMap = {
  postgres: {
    instance: new PostgresComponent(),
    dependenciesList: ['config'],
  },
  config: {
    instance: new ConfigComponent(ENV.dev),
    dependenciesList: [],
  },
  service: {
    instance: new ExpressService(routes),
    dependenciesList: ['config', 'postgres'],
  },
  models: {
    instance: new ModelsComponent(modelDescriptionMap),
    dependenciesList: ['postgres'],
  },
}
const main = async () => {
  const system = new System<IComponents>(componentMap)
  await system.start()
}

main()
.catch((err) => {
  console.log(err)
  process.exit(1)
})
