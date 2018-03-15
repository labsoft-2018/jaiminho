export interface IHttpClient {
  get(url: string, params?: object): Promise<{
    statusCode: number,
    body: any,
  }>
}

export class HttpClient implements IHttpClient {
    public async get(url: string, params?: object): Promise<any> {
      switch (url) {
        case 'new-payment-request':
        default:
          return {
            statusCode: 200,
            body: 'ok',
          }
      }
    }
}
