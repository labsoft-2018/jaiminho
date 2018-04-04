import { SQS } from 'aws-sdk'
import { ILifecycle } from './lifecycle'
import { ISQSProducer, IFifoMessage, IMessage } from './producer'

export class MockSQSProducer implements ILifecycle, ISQSProducer {
  public start() {
    // noop
  }
  public stop() {
    // noop
  }

  private buildBody = (data: object) => JSON.stringify(data)

  public async produceFifo(params: IFifoMessage) {
    return {
      messageId: '123',
      sequenceNumber: '123',
    }
  }

  public async produceStandard(params: IMessage) {
    return {
      messageId: '123',
      sequenceNumber: '123',
    }
  }
}
