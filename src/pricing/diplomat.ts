import { IDistanceResponse, IDistanceService } from '../components/distance-api'
import { ILocation } from '../common/model'

export const getDistance = (distanceService: IDistanceService, sourceLocation: ILocation, destLocation: ILocation): Promise<IDistanceResponse> => {
  return distanceService.getDistance(sourceLocation, destLocation)
}
