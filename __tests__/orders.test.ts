import { buildSchema } from '../src/graphql/schema'
import { loadFixtures, makeQueriableSchema, QueryOnSchema } from './helpers'
import { ITestComponents, testComponents } from './test-system'
import { System } from '../src/components/system'
import * as path from 'path'
import * as R from 'ramda'

const testSystem = new System<ITestComponents>(testComponents)
let queryOnSchema: QueryOnSchema

const testUsers = {
  customer: {
    id: '1',
    scopes: ['customer'],
  },
  carrier: {
    id: '2',
    scopes: ['carrier'],
  },
  merchant: {
    id: '3',
    scopes: ['admin'],
  },
}

const variables = (cardId: string) => ({
  input: {
    order: {
      sourceLocation: {
        lat: -23.3,
        lng: -46.6,
        address: 'eee',
      },
      destLocation: {
        lat: -23.3,
        lng: -46.601,
        address: 'yyy',
      },
      deliveryInstructions: 'blabla',
      withdrawalInstructions: 'xxx',
      contactNumber: '1194343434333',
    },
    paymentInfo : {
      cardId,
    },
  },
})

const query = `
mutation ($input: CreateOrderInput!) {
  createOrder(input: $input) {
    id
  }
}
`

describe('Create order', () => {
  beforeAll(async () => {
    // const schema = buildSchema()
    // const components = await testSystem.start()
    // await components.postgres.getConnection().sync({ force: true })
    // // await loadFixtures(path.join(__dirname, 'fixtures/orders-data.yaml'), components.models.getModels())

    // queryOnSchema = makeQueriableSchema(schema, components)
  })

  it('should work', async () => {
    // const response = await queryOnSchema({
    //   query,
    //   variables: variables('123'),
    //   as: testUsers.customer,
    //   dataExtractor: (res) => res.data.createOrder,
    // })

    // expect(response).toEqual({
    //   id: '1',
    // })
  })

  it('should return not authroized for carrier', async () => {
    // await expect(queryOnSchema({
    //   query,
    //   variables: variables('123'),
    //   as: testUsers.carrier,
    //   dataExtractor: (res) => res.data.createOrder,
    // })).rejects.toThrowError('NotAuthorized')
  })
})
