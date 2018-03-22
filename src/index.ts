import { system } from './system'
import { routes } from './routes'
import { IPostgresComponent } from './components/postgres'
import { IConfigComponent } from './components/config'
import { IService } from './components/service';
import { IModelsComponent } from './components/models'
import { IModels } from './models'
import { IHttpClient } from './components/http'
import { IDistanceService } from './components/distance-api'
import { ITokenComponent } from './components/token'

export interface IComponents {
  postgres: IPostgresComponent,
  config: IConfigComponent,
  service: IService,
  models: IModelsComponent<IModels>,
  http: IHttpClient,
  distanceService: IDistanceService,
  token: ITokenComponent,
}

const main = async () => {
  const components = await system.start()
  console.log(await components.token.encode({
    user: '1',
    scopes: ['admin'],
  }))
}

main()
.catch((err) => {
  console.log(err)
  process.exit(1)
})

/*
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMSIsInNjb3BlcyI6WyJhZG1pbiJdLCJpYXQiOjE1MjE2NzgxODQsImV4cCI6MTUyNDI3MDE4NCwiYXVkIjoidXNlciIsImlzcyI6InF1YWNrLXBhY2sifQ.pbnMuQ5SruY42vowFi6A-9t3LFCRwWpcvUM6YUKX_px26GwEBy4fxwEiaheOIwGe2np8deeHerTmRg7TTDUaUBvBkJv8vdFFW6NBrGxx2JN7RLqUJLTordu92pUeG0uSSdTL1IofzY8mDJnSPkcahqwV-s6j8xlcpdea9NkGCX7qpYhJ4zddXm_WNCr1Owm2CR_RiuRhMHiwPNrjDCGBLLSuJ3Sbbw46VDam5KVDw6yOWE-abEAjYkwajgfKVCZO_lMIhkaipob9CPfbaQ2zW72P_sGr0GzlDLbEWAo_-eL43jw5Npjx9CUS3qcIS7EZXJoTpPJgkQ6bggiBtU4N5Q
*/
