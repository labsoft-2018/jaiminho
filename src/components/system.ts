import { ILifecycle } from './lifecycle'
import { topoSort } from '@thunder-js/toposort'

export interface ISystem<T> {
  getStartedComponents(): T
}

export interface IComponentDescription {
  instance: ILifecycle,
  dependenciesList: string[],
}

export interface IComponentMap {
  [name: string]: IComponentDescription
}

const componentMapToGraph = (componentMap: IComponentMap) => Object.keys(componentMap).reduce((acc, componentId) => {
  const component = componentMap[componentId]
  return [
    ...acc, {
      id: componentId,
      edges: component.dependenciesList,
    },
  ]
}, [])

export class System<T> implements ISystem<T>, ILifecycle {
  private componentMap: IComponentMap
  private startedComponents: T

  constructor(componentMap: IComponentMap) {
    this.componentMap = componentMap
  }

  public async start() {
    console.log('[System] Starting...')
    const graph = componentMapToGraph(this.componentMap)
    const sorted = topoSort(graph)

    let startedComponents = {}

    try {
      for (const componentName of sorted) {
        const component = this.componentMap[componentName]
        const instance = component.instance
        const dependencies = component.dependenciesList.reduce((depAcc, dependencyId) => ({
          ...depAcc,
          [dependencyId]: this.componentMap[dependencyId].instance,
        }), {})

        await instance.start(dependencies)
        startedComponents = {
          ...startedComponents,
          [componentName]: instance,
        }
      }
    } catch (err) {
      console.log('[System] Error')
      console.log(err)
    }
    console.log('[System] UP!')

    return startedComponents
  }

  public stop() {
    // TODO: call STOP on startedComponents
  }

  public getStartedComponents() {
    return this.startedComponents
  }
}
