import { ITopicConfigMap } from '../../components/consumer'
import * as Joi from 'joi'
import { IComponents } from '../..'
import { deliveryClosed } from '../controller/delivery'
import { deliveryObjectToDelivery, IDeliveryClosedMessage } from '../adapters'

const deliveryClosedSchema = Joi.object({
  name: Joi.string(),
})

const deliveryAllocated = async (data) => {
  // noop
}

const deliveryAllocatedSchema = Joi.object({
  name: Joi.string(),
})

export const deliveryTopicConfigMap: ITopicConfigMap<IComponents> = {
  'delivery-closed': {
    handler: async (data, deps) => {
      return deliveryClosed(deliveryObjectToDelivery(data as IDeliveryClosedMessage), deps)
    },
    schema: deliveryClosedSchema,
  },
  'delivery-allocated': {
    handler: async (data, deps) => {

    },
    schema: deliveryClosedSchema,
  },
}
