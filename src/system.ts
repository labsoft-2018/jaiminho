import { routes } from './routes'
import { IComponents } from './index'
import { PostgresComponent } from './components/postgres'
import { IComponentMap, System } from './components/system'
import { ConfigComponent, ENV } from './components/config'
import { ExpressService } from './components/service'
import { ModelsComponent } from './components/models'
import { modelDescriptionMap } from './models'
import { HttpClient } from './components/http'
import { DistanceApi } from './components/distance-api'
import { S3Component } from './components/s3'
import * as AWS from 'aws-sdk'
import { TokenComponent } from './components/token'
import { MockConsumerComponent } from './components/mock-consumer'
import { deliveryTopicConfigMap } from './deliveries/diplomat/consumer'
import { SQSProducer } from './components/producer'
import { MockHttpClient } from './components/mock-http'
import { SERVICES, RESOURCES } from './common/constants'

const sqs = new AWS.SQS({
  region: 'us-east-1',
})

const mockMap = {
  [SERVICES.payments]: {
    [RESOURCES.newPaymentRequest]: {
      statusCode: 200,
    },
  },
}

const componentMap: IComponentMap = {
  postgres: {
    instance: new PostgresComponent(),
    dependenciesList: ['config'],
  },
  config: {
    instance: new ConfigComponent(ENV.dev),
    dependenciesList: [],
  },
  service: {
    instance: new ExpressService(routes),
    dependenciesList: ['config', 'postgres', 'models', 'http', 'distanceService', 's3', 'token', 'sqsProducer'],
  },
  models: {
    instance: new ModelsComponent(modelDescriptionMap),
    dependenciesList: ['postgres'],
  },
  http: {
    instance: new MockHttpClient(mockMap),
    dependenciesList: ['config'],
  },
  distanceService: {
    instance: new DistanceApi(),
    dependenciesList: ['config'],
  },
  s3: {
    instance: new S3Component(new AWS.S3()),
    dependenciesList: [],
  },
  token: {
    instance: new TokenComponent(),
    dependenciesList: ['config', 's3'],
  },
  consumer: {
    instance: new MockConsumerComponent(sqs, deliveryTopicConfigMap),
    dependenciesList: [],
  },
  sqsProducer: {
    instance: new SQSProducer(sqs),
    dependenciesList: [],
  },
}

export const system = new System<IComponents>(componentMap)
