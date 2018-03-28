import { ILifecycle } from './lifecycle';
export enum ENV {
  dev,
  prod,
  test,
}

export interface IServices {
  auth: string
  ['new-payment-request']: string
}

export interface IConfig {
  postgres: {
    database: string
    username: string
    password: string
    host: string
    port: number
  },
  services: IServices
  service: {
    port: number,
    name: string,
    password: string,
  },
  token: {
    issuer: string,
    audience: string,
    jwtDuration: string,
    bucketName: string,
    publicKeyPath: string,
    privateKeyPath: string,
  }
  google: {
    apiKey?: string,
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
      GOOGLE_API_KEY,
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
      services: {
        auth: 'https://auth.labsoft',  // FIXME
        ['new-payment-request']: 'https://new-payment-request.labsoft',
      },
      service: {
        port: 3002,
        name: 'accounts',
        password: "-e]{.*oS:U~Zz+~qz6VnU's+[1Vf12",
      },
      google: {
        apiKey: GOOGLE_API_KEY,
      },
      token: {
        issuer: 'quack-pack',
        audience: 'user',
        jwtDuration: '30d',
        publicKeyPath: 'test/pubkey.pem',
        privateKeyPath: 'test/privkey.pem',
        bucketName: 'labsoft-secrets',
      },
    }
    console.log('[Config] Ok!')
  }
}
