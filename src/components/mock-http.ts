import { ILifecycle } from './lifecycle'
import { IComponents } from '../index'
import { IConfig, IServices } from './config'
import axios from 'axios'
import { IHttpClient } from './http'

interface IMockMap {
  [servicename: string]: {
    [path: string]: any,
  }
}

export class MockHttpClient implements IHttpClient, ILifecycle {
  private token: string | null
  private config: IConfig
  private mockMap: IMockMap

  constructor(mockMap) {
    this.mockMap = mockMap
  }

  public async getToken(): Promise<string> {
    return 'a-token'
  }

  public async fetch({method, service, path, data}): Promise<any> {
    this.token = this.token || await this.getToken()
    return this.mockMap[service][path]
  }

  public start({ config }: IComponents) {
    this.config = config.getConfig()
  }

  public stop() {
    //  NO_OP
  }
}
