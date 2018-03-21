import { routes } from './routes';
import { IComponents } from './index';
import { PostgresComponent } from './components/postgres'
import { IComponentMap, System } from './components/system'
import { ConfigComponent, ENV } from './components/config'
import { ExpressService } from './components/service';
import { ModelsComponent } from './components/models'
import { modelDescriptionMap } from './models'
import { HttpClient } from './components/http'

const componentMap: IComponentMap = {
//   postgres: {
//     instance: new PostgresComponent(),
//     dependenciesList: ['config'],
//   },
  config: {
    instance: new ConfigComponent(ENV.dev),
    dependenciesList: [],
  },
//   service: {
//     instance: new ExpressService(routes),
//     dependenciesList: ['config', 'postgres', 'models', 'http'],
//   },
//   models: {
//     instance: new ModelsComponent(modelDescriptionMap),
//     dependenciesList: ['postgres'],
//   },
  http: {
    instance: new HttpClient(),
    dependenciesList: ['config'],
  },
}

export const system = new System<IComponents>(componentMap)
