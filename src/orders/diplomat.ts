import { IOrder } from './model';
import { IHttpClient, HttpClient, HttpMethods } from '../components/http';
import { ILocation } from '../common/model'
import { IPaymentInfoInput } from './resolvers/mutation';

export const newPaymentRequest = (http: IHttpClient, paymentInfo: IPaymentInfoInput, order: IOrder): Promise<boolean> => {
  return http.fetch({
    method: HttpMethods.get,
    url: 'new-payment-request',
    data: {
      cardId: paymentInfo.cardId,
      amount: order.amount,
      orderId: order.id,
    }
  }).then((data) => {
    return data.statusCode === 200
  })
}
