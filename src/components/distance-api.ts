import { ILifecycle } from './lifecycle'
import { IComponents } from '../index';
import { IConfig, IServices } from './config';
import axios from 'axios'
import { ILocation } from '../common/model'

export interface IDistanceResponse {
  duration: number,
  distance: number,
}
export interface IDistanceService {
  getDistance(sourceLocation: ILocation, destLocation: ILocation): Promise<IDistanceResponse>
}

export const formatLocation = (location: ILocation) => `${location.lat},${location.lng}`

export class DistanceApi implements IDistanceService, ILifecycle {
  private googleDistance: any

  constructor(googleDistance) {
    this.googleDistance = googleDistance
  }

  public getDistance(sourceLocation: ILocation, destLocation: ILocation): Promise<any> {
    return new Promise((resolve, reject) => {
      const origin = formatLocation(sourceLocation)
      const destination = formatLocation(destLocation)
      this.googleDistance.get({
        origin,
        destination,
      }, (err, data) => {
        if (err) {
          reject(err)
          return
        }
        resolve({
          duration: data.durationValue,
          distance: data.distanceValue,
        })
      })
    })
  }

  public start({ config }: IComponents) {
    const apiKey = config.getConfig().google.apiKey
    if (apiKey) {
      this.googleDistance.apiKey = apiKey
    }
  }

  public stop() {
    //  NO_OP
  }
}
