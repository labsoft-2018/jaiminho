import { SQS } from 'aws-sdk'
import { ILifecycle } from './lifecycle'

export interface IMessage {
  queueName: string,
  delaySeconds?: number,
  data: object,
}
export interface IFifoMessage extends IMessage {
  groupId: string,
  deduplicationId?: string,
}

export interface IProduceResult {
  messageId?: string,
  sequenceNumber?: string
}
export interface ISQSProducer {
  produceFifo(message: IFifoMessage): Promise<IProduceResult>
  produceStandard(message: IMessage): Promise<IProduceResult>
}

export class SQSProducer implements ILifecycle, ISQSProducer {
  private sqs: AWS.SQS

  constructor(sqs: AWS.SQS) {
    this.sqs = sqs
  }

  public start() {
    // noop
  }
  public stop() {
    // noop
  }

  private buildQueueUrl = (queueName: string) => this.sqs.getQueueUrl({
    QueueName: queueName,
  }).promise().then((data) => data.QueueUrl)

  private buildBody = (data: object) => JSON.stringify(data)

  public async produceFifo(params: IFifoMessage) {
    const queueUrl = await this.buildQueueUrl(params.queueName)
    if (!queueUrl) {
      throw new Error('Could not obtain queue url')
    }
    return this.sqs.sendMessage({
      QueueUrl: queueUrl,
      MessageBody: this.buildBody(params.data),
      MessageDeduplicationId: params.deduplicationId,
      MessageGroupId: params.groupId,
      DelaySeconds: params.delaySeconds,
    }).promise()
    .then((data) => ({
      messageId: data.MessageId,
      sequenceNumber: data.SequenceNumber,
    }))
  }

  public async produceStandard(params: IMessage) {
    const queueUrl = await this.buildQueueUrl(params.queueName)
    if (!queueUrl) {
      throw new Error('Could not obtain queue url')
    }
    return this.sqs.sendMessage({
      QueueUrl: queueUrl,
      MessageBody: this.buildBody(params.data),
      DelaySeconds: params.delaySeconds,
    }).promise()
    .then((data) => ({
      messageId: data.MessageId,
      sequenceNumber: data.SequenceNumber,
    }))
  }
}
