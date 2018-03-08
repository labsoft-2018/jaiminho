import { ILifecycle } from './lifecycle';
export enum ENV {
  dev,
  prod,
  test,
}

export interface IConfig {
  postgres: {
    database: string
    username: string
    password: string
    host: string
    port: number,
  },
  service: {
    port: number,
  }
}

export interface IConfigComponent {
  getConfig(): IConfig
}
export class ConfigComponent implements IConfigComponent, ILifecycle {
  private config: IConfig
  private env: ENV

  constructor(env: ENV) {
    this.env = env
  }

  public getConfig() {
    return this.config
  }

  public start() {
    // TODO: Read from file!
    // TODO: Different configs for different envs
    console.log('[Config] Starting...')
    const {
      POSTGRES_DATABASE,
      POSTGRES_USERNAME,
      POSTGRES_PASSWORD,
      POSTGRES_PORT,
      POSTGRES_HOST,
    } = process.env
    if (!POSTGRES_DATABASE || !POSTGRES_USERNAME || !POSTGRES_PASSWORD || !POSTGRES_PORT || !POSTGRES_HOST) {
      throw new Error('Provide all database configuration')
    }

    this.config = {
      postgres: {
        database: POSTGRES_DATABASE,
        username: POSTGRES_USERNAME,
        password: POSTGRES_PASSWORD,
        port: parseInt(POSTGRES_PORT, 10),
        host: POSTGRES_HOST,
      },
      service: {
        port: 3002,
      },
    }
    console.log('[Config] Ok!')
  }
}
