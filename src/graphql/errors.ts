import { GraphQLError } from 'graphql'

export abstract class CustomError extends Error {
  public transparent: boolean
  public isCustomError = true
  constructor(transparent: boolean, message?: string) {
      super(message)
      this.transparent = transparent
  }
}

export class OpaqueError extends CustomError {
  constructor(message?: string) {
      super(false, message)
  }
}

export class TransparentError extends CustomError {
  public code: string
  constructor(code: string, message?: string) {
      super(true, message)
      this.code = code
  }
}

export const isCustomError = (err: any): err is CustomError => err && err.isCustomError
export const isTransparentError = (err: CustomError): err is TransparentError => err.transparent

export interface IFormatErrorOptions {
    genericErrorMessage: string, // TODO improve default error message
    genericErrorCode: string,
}

export const defaultOptions: IFormatErrorOptions = {
    genericErrorMessage: 'Something went wrong. Try again later', // TODO improve default error message
    genericErrorCode: 'InternalServerError',
}

export const makeFormatError = (options: IFormatErrorOptions = defaultOptions) => (err: GraphQLError):
GraphQLError & { code: string } => {
  if (!err.originalError || err.originalError instanceof GraphQLError) { // the error is thrown by graphql input validator
    return {
      ...err,
      code: 'InvalidInput',
    }
  }
  if (isCustomError(err.originalError)) { // the error is thrown by the developer
    if (isTransparentError(err.originalError)) {
      return {
        ...err,
        message: err.message,
        code: err.originalError.code,
      }
    }
  }
  return { // the error is unexpected
    ...err,
    message: options.genericErrorMessage,
    code: options.genericErrorCode,
  }
}
