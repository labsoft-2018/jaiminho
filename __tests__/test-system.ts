import { System } from '../src/components/system'
import { PostgresComponent, IPostgresComponent } from '../src/components/postgres'
import { ConfigComponent, ENV, IConfigComponent } from '../src/components/config'
import { ModelsComponent, IModelsComponent } from '../src/components/models'
import { MockHttpClient } from '../src/components/mock-http'
import { DistanceApi, IDistanceService } from '../src/components/distance-api'
import { ConsumerComponent } from '../src/components/consumer'
import { SQSProducer, ISQSProducer } from '../src/components/producer'
import { modelDescriptionMap, IModels } from '../src/models'
import AWS = require('aws-sdk')
import { deliveryTopicConfigMap } from '../src/deliveries/diplomat/consumer'
import { SERVICES, RESOURCES } from '../src/common/constants'
import { IHttpClient } from '../src/components/http'
import { MockConsumerComponent } from '../src/components/mock-consumer'
import { MockPostgresComponent } from '../src/components/mock-postgres'
import { MockSQSProducer } from '../src/components/mock-producer';

const sqs = new AWS.SQS()
const mockMap = {
  [SERVICES.payments]: {
    [RESOURCES.newPaymentRequest]: {
      statusCode: 200,
    },
  },
}

export const testComponents = {
  postgres: {
    instance: new MockPostgresComponent(),
    dependenciesList: ['config'],
  },
  config: {
    instance: new ConfigComponent(ENV.dev),
    dependenciesList: [],
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
  consumer: {
    instance: new MockConsumerComponent(deliveryTopicConfigMap),
    dependenciesList: [],
  },
  sqsProducer: {
    instance: new MockSQSProducer(),
    dependenciesList: [],
  },
}

export interface ITestComponents {
  postgres: IPostgresComponent,
  config: IConfigComponent,
  models: IModelsComponent<IModels>,
  http: IHttpClient,
  distanceService: IDistanceService,
  sqsProducer: ISQSProducer,
}
