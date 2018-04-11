import { ITopicConfigMap } from '../../components/consumer'
import * as Joi from 'joi'
import { IComponents } from '../..'
import { deliveryClosed, deliveryAllocated } from '../controller/delivery'
import { deliveryObjectToDelivery, IDeliveryClosedMessage } from '../adapters'

const deliveryClosedSchema = Joi.any()
const deliveryAllocatedSchema = Joi.any()

export const deliveryTopicConfigMap: ITopicConfigMap<IComponents> = {
  'delivery-closed': {
    handler: async (data, deps) => {
      console.log('consuming delivery-closed')
      console.log(data)
      await deliveryClosed(deliveryObjectToDelivery(data as IDeliveryClosedMessage), deps)
    },
    schema: deliveryClosedSchema,
  },
  'delivery-allocated': {
    handler: async (data, deps) => {
      await deliveryAllocated(deliveryObjectToDelivery(data as IDeliveryClosedMessage), deps)
    },
    schema: deliveryAllocatedSchema,
  },
}
