import { ILifecycle } from './lifecycle'
import { IComponents } from '../index';
import { IConfig, IServices } from './config';
import axios from 'axios'

export enum HttpMethods {
  post = 'post',
  get = 'get',
}

export interface IHttpClient {
  fetch({method, url, data}: {method: HttpMethods, url: string, data?: object}): Promise<{
    statusCode: number,
    body: any,
  }>
}

export class HttpClient implements IHttpClient, ILifecycle {
  private token: string
  private config: IConfig

  private async getToken(): Promise<string> {
    return axios.post(`${this.config.services.auth}/api/services/token`, {
      'auth/service': this.config.service.name,
      'auth/password': this.config.service.password,
    })
    .then((response) => response['token/jwt'])
  }

  public async fetch(params): Promise<any> {
    this.token = this.token || await this.getToken()
    params.url = this.config.services[params.url]

    return axios({
      ...params,
      headers: {
        Authorization: this.token,
      },
    }).catch((err) => {
      console.log(err) // FIXME
      throw err
      // if (err ...) {
      //   // Refresh token
      //   this.token = null
      //   return this.fetch(params)
      // }
    })
  }

  public start({ config }: IComponents) {
    this.config = config.getConfig()
  }

  public stop() {
    //  NO_OP
  }
}
