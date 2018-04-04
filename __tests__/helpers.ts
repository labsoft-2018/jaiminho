import { IUser } from '../src/routes'
import { makeFormatError } from '../src/graphql/errors'
import { graphql } from 'graphql'
import * as sequelizeFixtures from 'sequelize-fixtures'

export type QueryOnSchema = (opts: IQueryOnSchemaOptions) => any

export interface IQueryOnSchemaOptions {
  query: string,
  variables?: any,
  as?: IUser,
  dataExtractor?: (response: any) => any,
}

const extractFirstErrorCode = (errors: any) => errors && errors[0].code

export const makeQueriableSchema = (schema, components): QueryOnSchema => async ({
  query,
  variables,
  as,
  dataExtractor,
}: IQueryOnSchemaOptions) => {
  const formatError = makeFormatError()

  const ctx = {
    components,
    user: as,
  }
  const response = await graphql(schema, query, {}, ctx, variables)
  if (response.errors) {
    const formattedErrors = response.errors.map(formatError)
    const code = extractFirstErrorCode(formattedErrors)
    console.log(response.errors)
    throw new Error(code)
  }

  return dataExtractor ? dataExtractor(response) : response
}

export const loadFixtures = (filePath: string, models: any) => {
  return sequelizeFixtures.loadFile(filePath, models, {
    log: () => null,
  })
}
