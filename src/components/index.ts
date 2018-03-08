import { IPostgresComponent } from './postgres'
import { IConfigComponent } from './config'
import { IService } from './service'

export interface IComponents {
  postgres: IPostgresComponent,
  config: IConfigComponent,
  service: IService
}
