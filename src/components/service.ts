import { ILifecycle } from './lifecycle'
import { IConfigComponent } from './config'
import * as express from 'express'
import { Server } from 'http';

export interface IService {
  getServer(): Server
}

export class ExpressService implements IService, ILifecycle {
  private routes: express.Router
  private app: express.Application
  private server: Server

  constructor(routes: express.Router) {
    this.routes = routes
    this.app = express()
  }

  public start(deps: { config: IConfigComponent }) {
    console.log('[Express] Starting...')
    return new Promise((resolve, reject) => {
      const port = deps.config.getConfig().service.port
      this.app.use((req: any, res, next) => {
        req.components = deps
        next()
      })
      this.app.use(this.routes)
      const server = this.app.listen(port, (err) => {
        if (err) {
          console.log('[Express] Error:')
          console.error(err)
          return reject(err)
        }

        this.server = server
        console.log(`[Express] Server is running on http://localhost:${port}/graphql`)
        resolve()
      });
    })
  }

  public stop() {
    // TODO: Close server
  }

  public getServer() {
    return this.server
  }
}
