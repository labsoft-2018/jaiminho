import { ILifecycle } from './lifecycle'
import * as sqsConsumer from 'sqs-consumer'
import * as Joi from 'joi'
import * as R from 'ramda'
import { SQS } from 'aws-sdk'

type ConsumerHandler<T> = (data: object, deps: T) => Promise<void>

export interface ITopicConfig<T> {
  handler: ConsumerHandler<T>,
  schema: Joi.Schema,
  consumerInstance?: string,
}
export interface ITopicConfigMap<T> {
  [topicName: string]: ITopicConfig<T>
}
export class ConsumerComponent<T> implements ILifecycle {
  private topicConfigMap: ITopicConfigMap<T>
  private consumer: sqsConsumer
  private sqs: AWS.SQS

  constructor(sqs: AWS.SQS, topicConfigMap) {
    this.topicConfigMap = topicConfigMap
    this.sqs = sqs
  }

  // TODO:
  private queueNameToQueueUrl = (queueName: string): string => `https://sqs.us-east-1.amazonaws.com/986381756175/${queueName}`

  private parseMessageAndValidate = (message: SQS.Message, schema) => {
    const data = message.Body ? JSON.parse(message.Body) : null
    const validate = Joi.validate(data, schema)
    if (validate.error) {
      throw new Error(validate.error.message)
    }
    return data
  }

  private setupHandler = (queueName: string, handler: ConsumerHandler, schema, deps): sqsConsumer => {
    console.log('Setting up ' + queueName)
    const app = sqsConsumer.create({
      queueUrl: this.queueNameToQueueUrl(queueName),
      handleMessage: async (message, done) => {
        try {
          const data = this.parseMessageAndValidate(message, schema)
          await handler(data, deps)
          done()
        } catch (err) {
          console.log('Error:')
          console.log(err)
          done(err)
        }
      },
      sqs: this.sqs,
    })

    app.on('error', (err) => {
      console.log(err.message)
    })
    app.start()

    return app
  }

  public async start(deps: any) {
    const topicConfigMap = R.pipe(
      R.toPairs,
      R.map(([queueName, topicConfig]) => ([
        queueName,
        R.assoc('consumerInstance', this.setupHandler(queueName, topicConfig.handler, topicConfig.schema, deps), topicConfig),
      ])),
      R.fromPairs,
    )(this.topicConfigMap) as ITopicConfigMap

    this.topicConfigMap = topicConfigMap
  }

  public async stop() {
    // noop
  }
}
