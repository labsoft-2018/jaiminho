import { ILifecycle } from './lifecycle'
import { IComponents } from '../index'
import { IConfig, IServices } from './config'
import axios from 'axios'

export enum HttpMethods {
  post = 'post',
  get = 'get',
}

export interface IHttpClient {
  fetch({method, service, path, data}: {method: HttpMethods, service: string, path: string, data?: object}): Promise<{
    statusCode: number,
    body: any,
  }>
}

export class HttpClient implements IHttpClient, ILifecycle {
  private token: string | null
  private config: IConfig

  public async getToken(): Promise<string> {
    return axios.post(`${this.config.services.auth}/api/services/token`, {
      'auth/service': this.config.service.name,
      'auth/password': this.config.service.password,
    })
    .then((response) => response.data['token/jwt'])
  }

  public async fetch({method, service, path, data}): Promise<any> {
    this.token = this.token || await this.getToken()

    const baseUrl = this.config.services[service]
    if (!baseUrl) {
      throw new Error(`Service ${service} is invalid`)
    }

    return axios({
      url: `${baseUrl}/${path}`,
      method,
      data,
      headers: {
        Authorization: this.token,
      },
    }).catch((err) => {
      if (!err.response || err.response.status !== 403) {
        throw err
      }
      this.token = null
      return this.fetch({method, service, path, data})
    })
  }

  public start({ config }: IComponents) {
    this.config = config.getConfig()
  }

  public stop() {
    //  NO_OP
  }
}
