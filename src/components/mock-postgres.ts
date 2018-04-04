import * as Sequelize from 'sequelize'
import { IConfig, IConfigComponent } from './config'
import { ILifecycle } from './lifecycle'

export interface IPostgresComponent {
  getConnection(): Sequelize.Sequelize
}

export class MockPostgresComponent implements IPostgresComponent, ILifecycle {
  private connection: Sequelize.Sequelize

  public getConnection() {
    return this.connection
  }

  public async start({ config }: { config: IConfigComponent }) {
    console.log('[Postgres] Starting...')
    const {
      database,
      username,
      password,
      host,
      port,
    } = config.getConfig().postgres

    console.log(host)

    this.connection = new Sequelize(database, 'user', 'pass', {
      dialect: 'sqlite',
      storage: './test.sqlite',
      logging: false,
      operatorsAliases: false,
    })
    try {
      this.connection.authenticate()
      console.log('[Postgres] Success!')
    } catch (err) {
      console.log(`[Postgres] Error connecting to ${host}:${port}/${database}`)
      throw err
    }
  }

  public stop() {
    //  TODO: Clear connection pool

  }
}
