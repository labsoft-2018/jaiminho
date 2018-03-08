
import { routes } from './routes';
import { PostgresComponent } from './components/postgres'
import { IComponentMap, System } from './components/system'
import { ConfigComponent, ENV } from './components/config'
import { ExpressService } from './components/service';
import { IComponents } from './components';

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
