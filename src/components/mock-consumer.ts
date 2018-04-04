import { ILifecycle } from './lifecycle'
import * as Joi from 'joi'
import { SQS } from 'aws-sdk'
import { ITopicConfigMap } from './consumer'

export class ConsumerComponent<T> implements ILifecycle {
  private topicConfigMap: ITopicConfigMap<T>
  private deps: any

  constructor(_: AWS.SQS, topicConfigMap) {
    this.topicConfigMap = topicConfigMap
  }

  private parseMessageAndValidate = (message: SQS.Message, schema) => {
    const data = message.Body ? JSON.parse(message.Body) : null
    const validate = Joi.validate(data, schema)
    if (validate.error) {
      throw new Error(validate.error.message)
    }
    return data
  }

  public async start(deps: any) {
    this.deps = deps
  }

  public async stop() {
    // noop
  }

  public handleMessage(queueName: string, message: SQS.Message) {
    const topic = this.topicConfigMap[queueName]
    return topic.handler(this.parseMessageAndValidate(message, topic.schema), this.deps)
  }
}
