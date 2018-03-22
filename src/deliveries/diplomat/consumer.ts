import { ITopicConfigMap } from '../../components/consumer'
import * as Joi from 'joi'

const deliveryClosed = async (data) => {
  // noop
  console.log('ok')
  console.log(data)
}

const deliveryClosedSchema = Joi.object({
  name: Joi.string(),
})

const deliveryAllocated = async (data) => {
  // noop
}

const deliveryAllocatedSchema = Joi.object({
  name: Joi.string(),
})

export const deliveryTopicConfigMap: ITopicConfigMap = {
  'delivery-closed': {
    handler: deliveryClosed,
    schema: deliveryClosedSchema,
  },
  'delivery-allocated': {
    handler: deliveryClosed,
    schema: deliveryClosedSchema,
  },
}
