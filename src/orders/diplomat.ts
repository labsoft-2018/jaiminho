import { IOrder } from './model';
import { IHttpClient } from '../components/http';
import { ILocation } from '../common/model'
import { IPaymentInfoInput } from './resolvers/mutation';

export const newPaymentRequest = (http: IHttpClient, paymentInfo: IPaymentInfoInput, order: IOrder): Promise<boolean> => {
  return http.get('new-payment-request', {
    cardId: paymentInfo.cardId,
    amount: order.amount,
    orderId: order.id,
  }).then((data) => {
    return data.statusCode === 200
  })
}

export const getPricing = (http: IHttpClient, sourceLocation: ILocation, destLocation: ILocation): Promise<number> => {
  return http.get('get-pricing', {
    sourceLat: sourceLocation.lat,
    sourceLng: sourceLocation.lng,
    destLat: destLocation.lat,
    destLng: destLocation.lng,
  }).then((data) => {
    return data.body
  })
}
