import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamName } from '../erros/missing-param-error'
import { badRequest } from '../helpers/http-helper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest?.body?.name) {
      return badRequest(new MissingParamName('name'))
    }

    if (!httpRequest?.body?.email) {
      return badRequest(new MissingParamName('email'))
    }
  }
}
