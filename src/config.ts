export enum ENV {
  dev = 'dev',
  prod = 'prod',
  test = 'test',
}

export interface IConfig {
  service: {
    port: number,
  },
}
export const newConfig = (env: ENV): IConfig => {
  switch (env) {
    case ENV.dev:
    default:
      return {
        service: {
          port: 3002,
        },
      }
    case ENV.prod:
      return {
        service: {
          port: 3002,
        },
      }
    case ENV.test:
      return {
        service: {
          port: 3002,
        },
      }
  }
}
