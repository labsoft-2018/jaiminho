import { ILifecycle } from './lifecycle'
import { IModelDescription } from '../models/index'
import { IPostgresComponent } from './postgres'

export interface IModelsComponent<T> {
  getModels(): T
}

export interface IModelDescriptionMap {
  [key: string]: IModelDescription
}
export class ModelsComponent<T> implements IModelsComponent<T>, ILifecycle {
  private models: T
  private modelDescriptionMap: IModelDescriptionMap

  constructor(modelDescriptionMap: IModelDescriptionMap) {
    this.modelDescriptionMap = modelDescriptionMap
  }

  public start({ postgres }: { postgres: IPostgresComponent }) {
    const modelMap: T = Object.keys(this.modelDescriptionMap).reduce((acc, key) => {
      const modelDescription = this.modelDescriptionMap[key]
      const model = postgres.getConnection().define(modelDescription.tableName, modelDescription.attributes)
      return {
        ...acc,
        [key]: model,
      }
    }, {}) as T

    Object.keys(this.modelDescriptionMap).forEach((modelKey) => {
      const model = this.modelDescriptionMap[modelKey]
      if (model.relations && typeof model.relations === 'function') {
        model.relations(modelMap[modelKey], modelMap as any)
      }
    })

    this.models = modelMap

    // !! DANGER !!
    postgres.getConnection().sync({ force: false })
  }

  public getModels() {
    return this.models
  }
}
