import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamName } from '../erros/missing-param-error'
import { InvalidParamError } from '../erros/invalid-param-error'
import { badRequest } from '../helpers/http-helper'
import { ServerError } from '../erros/server-error'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest?.body[field]) {
          return badRequest(new MissingParamName(field))
        }
      }

      const isValidEmail = this.emailValidator.isValid(httpRequest?.body?.email)

      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
  }
}
